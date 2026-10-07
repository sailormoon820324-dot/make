import React, { useState } from 'react';
import { PRODUCT_DATA, ALL_UPLOADED_PRODUCTS } from '../data/saengsikData';
import { ProductOption, ProductItem } from '../types';
import { Check, ShoppingBag, Sparkles, ShieldCheck, Truck, Clock, Plus, Minus, CheckCircle2 } from 'lucide-react';

interface ProductOrderSectionProps {
  onDirectOrder: (selectedOption: ProductOption, quantity: number, productName?: string) => void;
  onAddToCart: (selectedOption: ProductOption, quantity: number, productName?: string) => void;
  onOpenProductDetail: () => void;
  selectedProduct?: ProductItem | null;
}

export const ProductOrderSection: React.FC<ProductOrderSectionProps> = ({
  onDirectOrder,
  onAddToCart,
  onOpenProductDetail,
  selectedProduct,
}) => {
  // Current active product
  const [activeProduct, setActiveProduct] = useState<ProductItem>(selectedProduct || ALL_UPLOADED_PRODUCTS[0]);
  const [selectedOptionId, setSelectedOptionId] = useState<string>(activeProduct.options[0].id);
  const [quantity, setQuantity] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedProduct) {
      setActiveProduct(selectedProduct);
      setSelectedOptionId(selectedProduct.options[0].id);
      setQuantity(1);
    }
  }, [selectedProduct]);

  const selectedOption = activeProduct.options.find(opt => opt.id === selectedOptionId) || activeProduct.options[0];
  const totalPrice = selectedOption.price * quantity;

  // Handle switching product
  const handleSelectProduct = (product: ProductItem) => {
    setActiveProduct(product);
    setSelectedOptionId(product.options[0].id);
    setQuantity(1);
    const orderSection = document.getElementById('order-section');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = () => {
    onAddToCart(selectedOption, quantity, activeProduct.name);
    setToastMessage(`장바구니에 '${activeProduct.name} - ${selectedOption.title} ${quantity}개'를 담았습니다.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleIncrease = () => setQuantity(prev => Math.min(prev + 1, 99));
  const handleDecrease = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <section id="order-section" className="py-16 sm:py-24 bg-[#F2EDE2] border-t border-[#2D6A4F]/10 relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#1E3A2B] text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2 text-base font-bold animate-in fade-in slide-in-from-bottom-4">
          <Check className="w-5 h-5 text-[#86EFAC]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#2D6A4F] font-black text-sm sm:text-base tracking-widest block mb-2">
            DAILY NATURAL RAW MEAL STORE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1E3A2B] tracking-tight mb-3">
            상품 주문하기
          </h2>
          <p className="text-base sm:text-xl text-[#4A5E50] break-keep font-medium">
            국내산 50가지 정직한 원재료로 매일 아침을 가볍고 든든하게 시작하세요.
          </p>
        </div>

        {/* 1. Main Single Featured Product Card (Big price & big order button) */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-[#2D6A4F]/20 overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left: Product Real Image & Visual Highlights */}
            <div className="lg:col-span-5 bg-[#FAF7F0] p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#E8E2D5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#2D6A4F] text-white text-xs font-black rounded-full">
                    {activeProduct.badge}
                  </span>
                  <span className="text-xs font-bold text-[#8C6D4F]">
                    {activeProduct.engName}
                  </span>
                </div>

                {/* Uploaded Real Image with clean SVG fallback */}
                <div className="rounded-2xl overflow-hidden bg-white border border-[#2D6A4F]/15 shadow-sm relative group mb-4">
                  <img
                    src={activeProduct.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = activeProduct.fallbackImage;
                    }}
                    alt={activeProduct.name}
                    className="w-full h-auto aspect-4/3 object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                    실물 촬영 이미지
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#1E3A2B] leading-tight mb-2">
                  {activeProduct.name}
                </h3>
                <p className="text-sm sm:text-base text-[#4E6254] leading-relaxed mb-4">
                  {activeProduct.summary}
                </p>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 text-xs text-[#4A5E50] pt-4 border-t border-[#E8E2D5]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                  <span className="font-bold">농림축산식품부 유기가공식품 & 식약처 HACCP 인증</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                  <span className="font-bold">전국 무료배송 · 우체국 택배 안전 배송</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                  <span className="font-bold">평일 오후 2시 이전 결제 완료 시 당일 출고</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing, Options & Large Action Buttons */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Title & Large Price Display */}
                <div className="border-b border-[#EBE4D5] pb-6 mb-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-black text-[#2D6A4F] bg-[#E8F2EC] px-3 py-1 rounded-full">
                      당일발송 무료배송
                    </span>
                    <button
                      onClick={onOpenProductDetail}
                      className="text-xs sm:text-sm text-[#4E6254] underline hover:text-[#1E3A2B] font-bold cursor-pointer"
                    >
                      전성분 50종 확인하기
                    </button>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#1E3A2B] mb-3">
                    {activeProduct.name}
                  </h3>

                  {/* Price Row (Very large numbers for clear readability on phones) */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl sm:text-2xl font-bold text-[#9CA3AF] line-through">
                      {selectedOption.originalPrice.toLocaleString()}원
                    </span>
                    <span className="text-4xl sm:text-5xl font-black text-[#1E3A2B]">
                      {selectedOption.price.toLocaleString()}원
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#D9534F]">
                      {selectedOption.discountRate}% 할인
                    </span>
                  </div>
                </div>

                {/* Option Selector (Large buttons) */}
                <div className="mb-6">
                  <label className="block text-base sm:text-lg font-black text-[#1E3A2B] mb-3">
                    구성을 선택해주세요
                  </label>
                  <div className="space-y-3">
                    {activeProduct.options.map((opt) => {
                      const isSelected = selectedOptionId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedOptionId(opt.id)}
                          className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'border-[#2D6A4F] bg-[#F1F7F3] shadow-sm'
                              : 'border-[#E8E2D5] bg-[#FAF8F5] hover:border-[#D1C7B3]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'border-[#2D6A4F] bg-[#2D6A4F]'
                                  : 'border-[#B8AF9F] bg-white'
                              }`}
                            >
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-base sm:text-lg font-extrabold text-[#1E3A2B]">
                                  {opt.title}
                                </span>
                                {opt.isPopular && (
                                  <span className="bg-[#D9534F] text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                                    가장 인기
                                  </span>
                                )}
                              </div>
                              {opt.gift && (
                                <p className="text-xs sm:text-sm text-[#2D6A4F] font-bold mt-0.5">
                                  🎁 증정: {opt.gift}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-lg sm:text-xl font-black text-[#1E3A2B]">
                              {opt.price.toLocaleString()}원
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center justify-between p-4 bg-[#F8F6F0] rounded-2xl border border-[#E8E2D5] mb-6">
                  <span className="text-base font-bold text-[#1E3A2B]">주문 수량</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="w-11 h-11 rounded-xl bg-white border border-[#D5CDBD] text-[#1E3A2B] font-bold flex items-center justify-center hover:bg-[#EAE4D7] disabled:opacity-40 cursor-pointer"
                      aria-label="수량 감소"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-10 text-center font-black text-2xl text-[#1E3A2B]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="w-11 h-11 rounded-xl bg-white border border-[#D5CDBD] text-[#1E3A2B] font-bold flex items-center justify-center hover:bg-[#EAE4D7] cursor-pointer"
                      aria-label="수량 증가"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="flex items-center justify-between py-4 px-2 border-t border-[#EBE4D5] mb-6">
                  <span className="text-lg font-bold text-[#55695C]">총 결제 예정 금액</span>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-black text-[#1E3A2B]">
                      {totalPrice.toLocaleString()}원
                    </span>
                    <span className="block text-xs font-bold text-[#2D6A4F]">전국 무료배송</span>
                  </div>
                </div>
              </div>

              {/* Big Buttons: 주문하기 & 장바구니 */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onDirectOrder(selectedOption, quantity, activeProduct.name)}
                  className="w-full h-16 bg-[#2D6A4F] hover:bg-[#1E4D38] active:scale-[0.99] text-white text-xl sm:text-2xl font-black rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Sparkles className="w-6 h-6 text-[#A3E635]" />
                  <span>지금 바로 주문하기</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full h-14 bg-[#F2EDE2] hover:bg-[#E7DFCFC0] text-[#1E3A2B] text-lg font-black rounded-2xl border-2 border-[#2D6A4F]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 text-[#2D6A4F]" />
                  <span>장바구니에 담기</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. All 4 Uploaded Products Showcase Grid ("각 상품은 올려준 이미지로 업로드해주고") */}
        <div className="mt-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs sm:text-sm font-black text-[#2D6A4F] bg-[#E8F2EC] px-3.5 py-1.5 rounded-full inline-block mb-2">
              올려주신 상품 4종 라인업
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-[#1E3A2B] mb-2">
              다움 자연 식탁 전체 상품
            </h3>
            <p className="text-sm sm:text-base text-[#4E6254]">
              원하시는 상품을 클릭하시면 위 주문창에서 바로 선택 및 주문하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_UPLOADED_PRODUCTS.map((prod) => {
              const isCurrent = activeProduct.id === prod.id;
              return (
                <div
                  key={prod.id}
                  className={`bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                    isCurrent
                      ? 'border-[#2D6A4F] ring-4 ring-[#2D6A4F]/10'
                      : 'border-[#E5DEC9] hover:border-[#2D6A4F]/40'
                  }`}
                >
                  <div>
                    {/* Real Image */}
                    <div className="rounded-2xl overflow-hidden mb-4 bg-[#F8F6F0] border border-[#E8E2D5] relative group aspect-4/3">
                      <img
                        src={prod.image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = prod.fallbackImage;
                        }}
                        alt={prod.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2 left-2 bg-[#1E3A2B]/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {prod.badge}
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-[#1E3A2B] mb-1 line-clamp-1">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-[#627768] line-clamp-2 mb-3">
                      {prod.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F0EAE0]">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-xs text-[#9CA3AF] line-through">
                        {prod.originalPrice.toLocaleString()}원
                      </span>
                      <span className="text-lg font-black text-[#1E3A2B]">
                        {prod.price.toLocaleString()}원
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectProduct(prod)}
                      className={`w-full py-3 rounded-xl text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        isCurrent
                          ? 'bg-[#2D6A4F] text-white shadow-sm'
                          : 'bg-[#F2EDE2] text-[#1E3A2B] hover:bg-[#E8DFC9]'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#86EFAC]" />
                          <span>선택됨 (주문 중)</span>
                        </>
                      ) : (
                        <span>이 상품 선택하기</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
