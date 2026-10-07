import React, { useState } from 'react';
import { PRODUCT_DATA, DOMESTIC_50_INGREDIENTS } from '../data/saengsikData';
import { X, Search, CheckCircle, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToOrder: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  onScrollToOrder,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = DOMESTIC_50_INGREDIENTS.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.includes(searchTerm) ||
    item.description.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-[#F9F7F2] rounded-3xl shadow-2xl border-2 border-[#2D6A4F]/20 max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[#55695C] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F2EC] px-3 py-1 rounded-full">
          제품 상세설명 및 전성분
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A2B] mt-2 mb-2">
          {PRODUCT_DATA.name}
        </h2>
        <p className="text-sm sm:text-base text-[#4E6254] mb-6">
          {PRODUCT_DATA.shortDesc}
        </p>

        {/* Product Spec Table */}
        <div className="bg-white rounded-2xl border border-[#2D6A4F]/15 p-5 mb-8">
          <h3 className="text-lg font-black text-[#1E3A2B] mb-3 pb-2 border-b border-[#F4EFE6]">
            식품 표시사항 기본정보
          </h3>
          <div className="space-y-2.5 text-sm">
            {PRODUCT_DATA.specs.map((spec, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-bold text-[#687C6E] w-36 shrink-0">{spec.label}</span>
                <span className="text-[#1E3A2B] font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 50 Domestic Ingredients Search and Table */}
        <div className="bg-white rounded-2xl border border-[#2D6A4F]/15 p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg font-black text-[#1E3A2B]">국내산 50가지 원재료 전체 목록</h3>
              <p className="text-xs text-[#718576]">총 50개 성분 모두 100% 대한민국 원산지</p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#889A8D]" />
              <input
                type="text"
                placeholder="곡물/채소 이름 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 bg-[#F9F7F2] border border-[#DCD3C3] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F] w-full sm:w-48"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto divide-y divide-[#F2ECE1] border border-[#EAE4D7] rounded-xl">
            {filtered.map((item, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#1E3A2B]">{item.name}</span>
                  <span className="text-[11px] bg-[#E8F2EC] text-[#2D6A4F] font-bold px-1.5 py-0.5 rounded">
                    {item.origin}
                  </span>
                  <span className="text-xs text-[#84998A] hidden sm:inline">({item.category})</span>
                </div>
                <span className="text-xs text-[#526859] truncate max-w-[200px] sm:max-w-xs">
                  {item.description}
                </span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-6 text-center text-xs text-[#84998A]">
                검색된 원재료가 없습니다.
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            onScrollToOrder();
          }}
          className="w-full h-14 bg-[#2D6A4F] hover:bg-[#1E4D38] text-white rounded-2xl text-lg font-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>상품 주문하러 가기</span>
        </button>
      </div>
    </div>
  );
};
