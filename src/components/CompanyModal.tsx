import React from 'react';
import { X, Sprout, Heart, Shield, CheckCircle2 } from 'lucide-react';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToOrder: () => void;
}

export const CompanyModal: React.FC<CompanyModalProps> = ({
  isOpen,
  onClose,
  onScrollToOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#F9F7F2] rounded-3xl shadow-2xl border-2 border-[#2D6A4F]/20 max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[#55695C] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EFE8] text-[#2D6A4F] text-xs font-bold mb-3">
          <Sprout className="w-3.5 h-3.5" />
          <span>브랜드 이야기</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-[#1E3A2B] mb-4">
          초록한끼는 정직한 땅과<br />자연의 원료를 전합니다
        </h2>

        <p className="text-base sm:text-lg text-[#3E5244] leading-relaxed mb-8 break-keep">
          초록한끼는 "바쁜 일상 속에서도 가장 온전한 자연의 한 끼를 전하자"는 소박한 마음에서 출발했습니다.
          의학적 과장이나 불필요한 첨가물 없이, 오직 100% 대한민국 땅에서 자란 50가지 곡물과 채소만을 
          비가열 동결건조 방식으로 정직하게 담아냈습니다.
        </p>

        {/* 3 Core Values */}
        <div className="space-y-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#2D6A4F]/15 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#E8F2EC] text-[#2D6A4F] flex items-center justify-center font-black shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#1E3A2B] mb-1">100% 국내산 계약재배 원료</h3>
              <p className="text-sm text-[#5C7062] leading-relaxed">
                강원도 메밀부터 강화 쑥, 해남 시금치, 제주 비트까지 전국 각지 농가와 계약을 맺고 신선한 햇곡물과 제철 채소만을 수매합니다.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#2D6A4F]/15 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#E8F2EC] text-[#2D6A4F] flex items-center justify-center font-black shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#1E3A2B] mb-1">영하 40도 비가열 동결건조</h3>
              <p className="text-sm text-[#5C7062] leading-relaxed">
                열을 가해 볶는 방식이 아닌, 급속 냉동 후 감압 건조하는 공법으로 자연 고유의 색과 엽록소, 은은한 본연의 맛을 그대로 지킵니다.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#2D6A4F]/15 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#E8F2EC] text-[#2D6A4F] flex items-center justify-center font-black shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#1E3A2B] mb-1">무첨가 0%의 원칙</h3>
              <p className="text-sm text-[#5C7062] leading-relaxed">
                인위적인 단맛을 내는 설탕, 보존 기간을 늘리는 합성보존료, 색소 등을 일절 첨가하지 않아 남녀노소 누구나 안심하고 드실 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#EFE9DD] p-4 rounded-2xl border border-[#E2D8C6] text-xs text-[#526859] leading-relaxed mb-6">
          * 초록한끼 자연생식은 일반가공식품(생식함유식품)으로 질병의 예방 및 치료를 위한 의약품이나 건강기능식품이 아니며, 균형 잡힌 일상 식사 대용을 위한 식품입니다.
        </div>

        <button
          onClick={() => {
            onClose();
            onScrollToOrder();
          }}
          className="w-full h-14 bg-[#2D6A4F] hover:bg-[#1E4D38] text-white rounded-2xl text-lg font-black transition-colors cursor-pointer"
        >
          초록한끼 생식 주문하러 가기
        </button>
      </div>
    </div>
  );
};
