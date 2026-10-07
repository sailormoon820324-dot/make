import React, { useState } from 'react';
import { DOMESTIC_50_INGREDIENTS } from '../data/saengsikData';
import { Check, Info, Sprout, ArrowRight } from 'lucide-react';

interface IngredientsSectionProps {
  onOpenProductDetail: () => void;
}

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({ onOpenProductDetail }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '통곡류', '녹황색채소', '뿌리채소', '버섯해조류', '씨앗류'];

  const filteredIngredients = selectedCategory === '전체'
    ? DOMESTIC_50_INGREDIENTS
    : DOMESTIC_50_INGREDIENTS.filter(item => item.category === selectedCategory);

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-[#F8F6F0] border-b border-[#2D6A4F]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E5EFE8] text-[#2D6A4F] text-sm sm:text-base font-bold mb-4">
            <Sprout className="w-4 h-4" />
            <span>원산지 100% 대한민국</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A2B] tracking-tight mb-5 leading-tight">
            국내산 50가지 곡물과 채소로<br />
            정직하게 채웠습니다
          </h2>
          <p className="text-base sm:text-xl text-[#3E5244] leading-relaxed break-keep">
            인공 감미료나 합성 보존료 없이, 순수 우리 땅에서 자란 통곡물 15종, 
            녹황색 채소 18종, 뿌리채소 8종, 버섯·해조류 5종, 씨앗류 4종을 
            영하 40도 동결건조 공법으로 가루 내어 신선함과 고소함을 온전히 보존했습니다.
          </p>
        </div>

        {/* Category Tabs (Segmented Control - large touch-friendly buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2D6A4F] text-white shadow-md'
                    : 'bg-[#EDE7DA] text-[#3E5244] hover:bg-[#E2D8C6]'
                }`}
              >
                {cat} {cat === '전체' ? `(50종)` : ''}
              </button>
            );
          })}
        </div>

        {/* 50 Ingredients Grid (Clean, readable, responsive) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
          {filteredIngredients.slice(0, 15).map((ing, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-[#2D6A4F]/15 shadow-xs hover:border-[#2D6A4F]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-[#2D6A4F] bg-[#E8F2EC] px-2 py-0.5 rounded-md">
                    {ing.origin}
                  </span>
                  <span className="text-[11px] text-[#718576] font-medium">{ing.category}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#1E3A2B] mb-1.5">{ing.name}</h3>
                <p className="text-xs sm:text-sm text-[#4E6254] leading-relaxed line-clamp-2">
                  {ing.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* More details / Call to action */}
        <div className="bg-[#EFE9DD] rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto border border-[#E2D8C6] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl sm:text-2xl font-black text-[#1E3A2B] mb-1">
              50가지 전성분 원료명 & 상세 정보
            </h3>
            <p className="text-sm sm:text-base text-[#4E6254]">
              어떤 원료도 빠짐없이 100% 투명하게 공개합니다.
            </p>
          </div>
          <button
            onClick={onOpenProductDetail}
            className="w-full sm:w-auto px-7 py-4 bg-[#2D6A4F] hover:bg-[#1E4D38] text-white text-base sm:text-lg font-bold rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>50가지 전성분 전체보기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Raw Food (생식) vs Common Roasted Powder (선식) Comparison Table */}
        <div className="mt-14 max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#2D6A4F]/15 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-black text-[#1E3A2B] mb-6 text-center">
            정직한 제조 공정: 열을 가하지 않는 동결건조
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-[#F8F6F0] border border-[#E5DECD]">
              <div className="w-12 h-12 rounded-full bg-[#E8F2EC] text-[#2D6A4F] flex items-center justify-center font-black mx-auto mb-3 text-lg">
                01
              </div>
              <h4 className="font-extrabold text-[#1E3A2B] text-lg mb-1">100% 국내산 계약재배</h4>
              <p className="text-sm text-[#4E6254]">깨끗한 우리 땅에서 정직하게 키운 신선한 50가지 햇원료만 엄선</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F6F0] border border-[#E5DECD]">
              <div className="w-12 h-12 rounded-full bg-[#E8F2EC] text-[#2D6A4F] flex items-center justify-center font-black mx-auto mb-3 text-lg">
                02
              </div>
              <h4 className="font-extrabold text-[#1E3A2B] text-lg mb-1">영하 40℃ 급속 동결건조</h4>
              <p className="text-sm text-[#4E6254]">열에 의한 영양소 파괴 없이 원물 본연의 색, 향, 식이섬유 유지</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F6F0] border border-[#E5DECD]">
              <div className="w-12 h-12 rounded-full bg-[#E8F2EC] text-[#2D6A4F] flex items-center justify-center font-black mx-auto mb-3 text-lg">
                03
              </div>
              <h4 className="font-extrabold text-[#1E3A2B] text-lg mb-1">1포 35g 간편 개별포장</h4>
              <p className="text-sm text-[#4E6254]">산소와 습기를 차단하는 특수 알루미늄 파우치로 갓 만든 신선함</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
