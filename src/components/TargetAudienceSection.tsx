import React from 'react';
import { TARGET_AUDIENCE } from '../data/saengsikData';
import { Sun, Utensils, Leaf, CheckCircle } from 'lucide-react';

interface TargetAudienceSectionProps {
  onScrollToOrder: () => void;
}

export const TargetAudienceSection: React.FC<TargetAudienceSectionProps> = ({ onScrollToOrder }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-8 h-8 text-[#2D6A4F]" />;
      case 'Utensils':
        return <Utensils className="w-8 h-8 text-[#2D6A4F]" />;
      case 'Leaf':
        return <Leaf className="w-8 h-8 text-[#2D6A4F]" />;
      default:
        return <CheckCircle className="w-8 h-8 text-[#2D6A4F]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F8F6F0] to-[#EFE9DD] border-b border-[#2D6A4F]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#2D6A4F] font-bold text-base sm:text-lg tracking-wider block mb-2">
            온바른 자연생식 추천
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A2B] tracking-tight mb-4">
            이런 분들께 좋아요
          </h2>
          <p className="text-base sm:text-xl text-[#4A5E50] leading-relaxed break-keep">
            복잡한 일상 속에서 가장 쉽고 건강하게 한 끼를 챙기는 방법입니다.
          </p>
        </div>

        {/* 3 User Target Cards (Large Text, High Legibility, Green & Beige) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {TARGET_AUDIENCE.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-[#2D6A4F]/15 shadow-sm hover:shadow-md hover:border-[#2D6A4F]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#E8F2EC] flex items-center justify-center shadow-xs">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-2xl font-black text-[#8D6E53]/40 tracking-wider">
                    {item.step}
                  </span>
                </div>

                <div className="inline-block px-3 py-1 rounded-md bg-[#F4EFE6] text-[#8D6E53] text-xs sm:text-sm font-bold mb-3">
                  {item.badge}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#1E3A2B] mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-base font-bold text-[#2D6A4F] mb-4">
                  {item.subtitle}
                </p>

                <p className="text-base sm:text-lg text-[#3E5244] leading-relaxed break-keep">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[#F0EAE0] flex items-center gap-2 text-sm font-bold text-[#2D6A4F]">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>30초면 완성되는 간편한 한 끼</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big Action button to scroll down */}
        <div className="text-center">
          <button
            onClick={onScrollToOrder}
            className="w-full sm:w-auto px-10 py-5 bg-[#2D6A4F] hover:bg-[#1E4D38] text-white text-xl font-black rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>나를 위한 한 끼 주문하기</span>
          </button>
        </div>
      </div>
    </section>
  );
};
