import React, { useState } from 'react';
import { HOW_TO_DRINK_STEPS } from '../data/saengsikData';
import { ArrowRight, Droplets, Milk, Sparkles, CheckCircle2 } from 'lucide-react';

export const HowToDrinkSection: React.FC = () => {
  const [flavorTip, setFlavorTip] = useState<'water' | 'milk'>('milk');

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#2D6A4F]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#2D6A4F] font-bold text-base sm:text-lg tracking-wider block mb-2">
            초간편 3단계 음용법
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A2B] tracking-tight mb-4">
            물이나 우유에 타서 드세요
          </h2>
          <p className="text-base sm:text-xl text-[#4A5E50] leading-relaxed break-keep">
            쉐이커나 컵만 있으면 준비 끝! 30초 만에 든든하고 신선한 한 끼가 완성됩니다.
          </p>
        </div>

        {/* 1 → 2 → 3 Step Sequence (Very prominent, large text, green & beige) */}
        <div className="relative mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {HOW_TO_DRINK_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-[#2D6A4F]/20 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-14 h-14 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center text-2xl font-black shadow-sm">
                      {step.stepNumber}
                    </span>
                    <span className="text-sm font-black text-[#2D6A4F] bg-[#E8F2EC] px-3 py-1 rounded-full">
                      {step.stepLabel}
                    </span>
                  </div>

                  {/* Step Title (Large) */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1E3A2B] mb-3 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-base sm:text-lg text-[#3E5244] leading-relaxed mb-6 break-keep">
                    {step.desc}
                  </p>
                </div>

                {/* Helpful Tip */}
                <div className="bg-[#F8F6F0] p-4 rounded-2xl border border-[#EBE3D3] mt-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#5C7062] font-medium leading-relaxed">
                      {step.tip}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator between steps for mobile / tablet */}
                {idx < 2 && (
                  <div className="md:hidden flex justify-center my-2 text-[#2D6A4F]">
                    <span className="text-2xl">⬇</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Arrow Connectors in background */}
          <div className="hidden md:flex absolute top-1/2 left-0 right-0 -translate-y-12 justify-around pointer-events-none px-28 text-[#2D6A4F]/40 font-black text-3xl">
            <span>➜</span>
            <span>➜</span>
          </div>
        </div>

        {/* Flavor Tip Tabs (Water vs Milk) */}
        <div className="max-w-2xl mx-auto bg-[#EFE9DD] p-6 sm:p-8 rounded-3xl border border-[#E2D8C6]">
          <h3 className="text-center text-xl sm:text-2xl font-black text-[#1E3A2B] mb-4">
            어떤 음료와 함께 드실 건가요?
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setFlavorTip('water')}
              className={`p-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                flavorTip === 'water'
                  ? 'bg-[#2D6A4F] text-white shadow-md'
                  : 'bg-white text-[#1E3A2B] hover:bg-[#F8F6F0]'
              }`}
            >
              <Droplets className="w-5 h-5" />
              <span>물 200ml (깔끔한 맛)</span>
            </button>

            <button
              onClick={() => setFlavorTip('milk')}
              className={`p-4 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                flavorTip === 'milk'
                  ? 'bg-[#2D6A4F] text-white shadow-md'
                  : 'bg-white text-[#1E3A2B] hover:bg-[#F8F6F0]'
              }`}
            >
              <Milk className="w-5 h-5" />
              <span>우유·두유 (고소한 맛)</span>
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DCD3C0] text-center">
            {flavorTip === 'water' ? (
              <p className="text-base sm:text-lg text-[#2D4536] leading-relaxed break-keep font-medium">
                💧 <strong className="font-bold text-[#1E3A2B]">맑고 깔끔한 채소·곡물 본연의 맛:</strong> 찬물 또는 미온수 200ml에 타서 드시면 텁텁함 없이 산뜻하게 꿀꺽 넘어갑니다.
              </p>
            ) : (
              <p className="text-base sm:text-lg text-[#2D4536] leading-relaxed break-keep font-medium">
                🥛 <strong className="font-bold text-[#1E3A2B]">진하고 부드러운 곡물 라떼 풍미:</strong> 우유나 무가당 두유에 타시면 더욱 진하고 고소한 미숫가루 느낌으로 긴 시간 든든합니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
