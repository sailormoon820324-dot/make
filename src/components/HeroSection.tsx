import React from 'react';
import { ArrowDown, CheckCircle2, ChevronRight, Sparkles, Sprout } from 'lucide-react';

interface HeroSectionProps {
  onScrollToOrder: () => void;
  onOpenProductDetail: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToOrder,
  onOpenProductDetail,
}) => {
  return (
    <section id="hero" className="relative">
      {/* 1. Official Daoom Header Banner (matching screenshot) */}
      <div className="relative bg-[#1A0E08] text-white py-16 sm:py-24 px-4 overflow-hidden border-b border-[#3D2517]">
        {/* Bowls image background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/daoom_banner_bowls.svg"
            alt="다움 자연 원료 곡물"
            className="w-full h-full object-cover object-center opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-xs sm:text-sm text-[#D8C7B5] font-medium tracking-wide mb-3">
            Home &gt; 사업영역 &gt; 다움생식
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-md">
            다움생식
          </h1>
          <p className="text-sm sm:text-lg text-[#EAE0D5] font-normal leading-relaxed max-w-2xl mx-auto break-keep">
            1988년부터 시작된 식품 연구 노하우와 기술력을 바탕으로 식물성 원료와 다양한 영양소의 균형 잡힌 섭취에 초점을 맞춘 우수한 품질의 건강식품을 판매하고 있습니다.
          </p>
        </div>
      </div>

      {/* 2. User Required Main Hero CTA: "하루 한 잔, 간편한 한 끼" & Big "주문하기" button */}
      <div className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#F9F7F2] via-[#F4EFE6] to-[#EBE4D5]">
        {/* Subtle organic background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D6A4F]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#407B57]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Subtle natural badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5EFE8] border border-[#2D6A4F]/20 text-[#2D6A4F] text-sm sm:text-base font-bold mb-6 shadow-xs">
              <Sprout className="w-4 h-4 text-[#2D6A4F]" />
              <span>정직한 땅에서 기른 100% 국내산 50가지 곡물과 채소</span>
            </div>

            {/* User Required Main Headline: "하루한잔,간편한 한끼" in very large font */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1E3A2B] tracking-tight leading-[1.15] mb-6 drop-shadow-xs">
              <span className="block text-[#1E3A2B]">하루 한 잔,</span>
              <span className="block text-[#2D6A4F] mt-1 sm:mt-2">간편한 한 끼</span>
            </h2>

            {/* Compliant, wholesome description focusing on ingredients & simplicity */}
            <p className="text-lg sm:text-2xl text-[#3A4F41] font-medium leading-relaxed max-w-2xl mx-auto mb-10 break-keep">
              복잡한 준비 없이 언제 어디서나 물이나 우유에 타서 드세요.
              자연 그대로 담아낸 <strong className="text-[#1E3A2B] font-bold">50가지 자연 원료</strong>가
              일상에 든든하고 편안한 포만감을 전합니다.
            </p>

            {/* User Required: Big "주문하기" button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto mb-12">
              <button
                onClick={onScrollToOrder}
                className="w-full sm:w-auto px-10 py-5 bg-[#2D6A4F] hover:bg-[#1E4D38] text-white text-xl sm:text-2xl font-black rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Sparkles className="w-6 h-6 text-[#A3E635] group-hover:rotate-12 transition-transform" />
                <span>지금 주문하기</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenProductDetail}
                className="w-full sm:w-auto px-8 py-5 bg-[#EAE2D2] hover:bg-[#DDD3C0] text-[#1E3A2B] text-lg sm:text-xl font-bold rounded-2xl border border-[#2D6A4F]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>50가지 원재료 자세히보기</span>
              </button>
            </div>

            {/* Key 3 Trust Badges (clean, large text) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto pt-6 border-t border-[#2D6A4F]/15">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-[#2D6A4F]/10">
                <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                <div className="text-left">
                  <span className="block text-sm sm:text-base font-extrabold text-[#1E3A2B]">100% 국내산 원료</span>
                  <span className="block text-xs text-[#526859]">통곡물 15종 + 채소 18종 외</span>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-[#2D6A4F]/10">
                <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                <div className="text-left">
                  <span className="block text-sm sm:text-base font-extrabold text-[#1E3A2B]">영하 40℃ 동결건조</span>
                  <span className="block text-xs text-[#526859]">비가열 생식으로 맛·영양 보존</span>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-[#2D6A4F]/10">
                <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                <div className="text-left">
                  <span className="block text-sm sm:text-base font-extrabold text-[#1E3A2B]">무첨가 안심 원칙</span>
                  <span className="block text-xs text-[#526859]">설탕 · 합성보존료 · 색소 0%</span>
                </div>
              </div>
            </div>
          </div>

        {/* Visual Hero Showcase Card */}
        <div className="mt-12 sm:mt-16 bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#2D6A4F]/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual representation with real uploaded image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden border border-[#2D6A4F]/20 shadow-md relative group bg-[#F8F6F0]">
                <img
                  src="/KakaoTalk_20261007_090259538.png"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/daoom_saengsik.svg';
                  }}
                  alt="다움 유기농 온가족 생식"
                  className="w-full h-auto aspect-4/3 object-cover object-center group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-3 py-1 bg-[#2D6A4F]/90 backdrop-blur-xs rounded-full text-xs font-black text-white shadow-xs">
                    유기가공식품 인증
                  </span>
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-full text-xs font-bold text-[#1E3A2B] shadow-xs">
                    1포 35g
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
                  <p className="font-black text-lg text-white">다움 유기농 온가족 생식</p>
                  <p className="text-xs text-[#E8F2EC]">Daoom Organic Family Meal · 전용 보틀 증정</p>
                </div>
              </div>
            </div>

            {/* Quick summary highlights */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <div className="inline-block">
                <span className="text-xs font-black text-[#2D6A4F] bg-[#E8F2EC] px-3 py-1 rounded-md">
                  동결건조 생식(生食)이란?
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A2B] leading-snug">
                왜 가열하지 않은 "생식(生食)"일까요?
              </h2>

              <p className="text-base sm:text-lg text-[#3A4F41] leading-relaxed break-keep">
                생식은 열을 가해 볶는 일반 선식과 달리, 
                <strong className="text-[#2D6A4F] font-bold"> 자연 원물을 영하 40도에서 급속 동결건조</strong>하여 곱게 가루냅니다. 
                열에 취약한 곡물과 잎채소 본래의 생생한 빛깔, 향기, 그리고 효소와 식이섬유를 파괴 없이 오롯이 지켜냅니다.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#E2D8C3]">
                  <span className="text-xs font-bold text-[#8D6E53] block mb-1">볶은 선식(일반 가열)</span>
                  <p className="text-sm text-[#526859] leading-tight">열풍 조리로 영양소 열변성 발생 가능</p>
                </div>
                <div className="bg-[#EBF4EE] p-4 rounded-xl border border-[#2D6A4F]/30">
                  <span className="text-xs font-bold text-[#2D6A4F] block mb-1">다움 유기농 생식 (동결건조)</span>
                  <p className="text-sm font-semibold text-[#1E3A2B] leading-tight">50가지 자연 원물 본연의 영양 그대로</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onScrollToOrder}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#2D6A4F] hover:bg-[#1E4D38] text-white font-bold rounded-xl text-base flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>다움 유기농 생식 주문하기</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};
