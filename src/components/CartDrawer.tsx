import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#F9F7F2] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#2D6A4F]/15 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#2D6A4F]" />
            <h2 className="text-2xl font-black text-[#1E3A2B]">장바구니</h2>
            <span className="text-sm font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2 py-0.5 rounded-full">
              {items.length}개
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#55695C] hover:bg-[#F0EAE0] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#758A7C] py-12">
              <ShoppingBag className="w-16 h-16 stroke-1 text-[#A8BDB0] mb-4" />
              <p className="text-xl font-bold text-[#1E3A2B] mb-1">장바구니가 비어 있습니다.</p>
              <p className="text-sm text-[#5C7062]">국내산 50곡 자연생식을 담아보세요.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-[#2D6A4F]/15 shadow-xs flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-extrabold text-base text-[#1E3A2B]">{item.title}</h3>
                    <p className="text-sm font-semibold text-[#2D6A4F]">{item.optionTitle}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#99A79E] hover:text-[#D9534F] p-1"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#F4EFE6] mt-2">
                  <div className="flex items-center gap-2 bg-[#F9F7F2] p-1 rounded-xl border border-[#E8E2D5]">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white text-[#1E3A2B] font-bold flex items-center justify-center hover:bg-[#EAE4D7]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white text-[#1E3A2B] font-bold flex items-center justify-center hover:bg-[#EAE4D7]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-lg font-black text-[#1E3A2B]">
                    {(item.price * item.quantity).toLocaleString()}원
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#2D6A4F]/15 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#5C7062]">
                <span>상품 금액</span>
                <span>{totalAmount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-[#2D6A4F] font-bold">
                <span>배송비</span>
                <span>무료배송</span>
              </div>
              <div className="flex justify-between text-xl font-black text-[#1E3A2B] pt-2 border-t border-[#EAE4D7]">
                <span>총 주문 금액</span>
                <span>{totalAmount.toLocaleString()}원</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full h-14 bg-[#2D6A4F] hover:bg-[#1E4D38] text-white rounded-2xl text-lg font-black shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>주문서 작성하기</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
