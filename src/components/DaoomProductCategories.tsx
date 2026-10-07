import React from 'react';
import { ALL_UPLOADED_PRODUCTS } from '../data/saengsikData';
import { ProductItem } from '../types';
import { ChevronUp, ShoppingBag, Sparkles } from 'lucide-react';

interface DaoomProductCategoriesProps {
  onSelectProduct: (product: ProductItem) => void;
  onScrollToTop: () => void;
}

export const DaoomProductCategories: React.FC<DaoomProductCategoriesProps> = ({
  onSelectProduct,
  onScrollToTop,
}) => {
  const categories: Array<'생식/간편식' | '건강기능식품' | '분말/정/환 식품' | '건강즙/진액 식품'> = [
    '생식/간편식',
    '건강기능식품',
    '분말/정/환 식품',
    '건강즙/진액 식품',
  ];

  return (
    <section id="categories-section" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.map((category) => {
          const items = ALL_UPLOADED_PRODUCTS.filter((p) => p.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="mb-20 last:mb-0 relative">
              {/* Category Title (Centered, bold serif/clean font matching Daoom screenshot) */}
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                  {category}
                </h2>
              </div>

              {/* Grid matching Daoom screenshot layout */}
              <div
                className={`grid gap-6 sm:gap-8 ${
                  items.length === 3
                    ? 'grid-cols-1 sm:grid-cols-3'
                    : items.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}
              >
                {items.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="group cursor-pointer flex flex-col items-center text-center"
                  >
                    {/* Soft beige rounded card container matching Daoom screenshot */}
                    <div className="w-full aspect-square rounded-xl bg-[#E8E4DA] overflow-hidden p-6 sm:p-8 flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 relative">
                      <img
                        src={prod.image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = prod.fallbackImage;
                        }}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-[#2D6A4F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 bg-[#2D6A4F] text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
                          주문 및 상세 보기
                        </span>
                      </div>
                    </div>

                    {/* Product Name Below Card (Centered clean typography matching screenshot) */}
                    <div className="mt-4">
                      <h3 className="text-base sm:text-lg font-bold text-[#222222] group-hover:text-[#2D6A4F] transition-colors">
                        {prod.name}
                      </h3>
                      <p className="text-sm font-black text-[#2D6A4F] mt-1">
                        {prod.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
