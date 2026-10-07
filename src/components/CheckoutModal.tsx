import React, { useState } from 'react';
import { CartItem, OrderForm, OrderRecord } from '../types';
import { X, CheckCircle, CreditCard, ShieldCheck, AlertTriangle, Sparkles, Copy, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (newOrder?: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  const [formData, setFormData] = useState<OrderForm>({
    name: '김자연',
    phone: '010-1234-5678',
    zipCode: '06123',
    address: '서울특별시 강남구 테헤란로 123',
    detailAddress: '초록빌딩 402호',
    deliveryRequest: '부재 시 문 앞에 놓아주세요.',
    paymentMethod: 'card',
    cardNumber: '0000 - 0000 - 0000 - 0000',
    cardExpiry: '12 / 28',
    cardCvc: '777',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState('');
  const [latestOrderRecord, setLatestOrderRecord] = useState<OrderRecord | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Generate order number in format: ORD-20261007-0324
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNo = `ORD-${yyyy}${mm}${dd}-0324`;

    const newOrder: OrderRecord = {
      id: orderNo,
      orderTime: `${yyyy}-${mm}-${dd} ${hh}:${min}`,
      customerName: formData.name,
      customerPhone: formData.phone,
      shippingAddress: `${formData.address} ${formData.detailAddress}`,
      items: [...items],
      itemsSummary: items.length > 1
        ? `${items[0].title} 외 ${items.length - 1}건`
        : `${items[0]?.title || '다움 유기농 온가족 생식'} (${items[0]?.optionTitle || ''})`,
      totalAmount,
      paymentMethod: getPaymentName(),
      status: '결제완료',
      isNew: true,
    };

    setTimeout(() => {
      setGeneratedOrderNumber(orderNo);
      setLatestOrderRecord(newOrder);
      setIsProcessing(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleFinish = () => {
    setIsSubmitted(false);
    if (latestOrderRecord) {
      onOrderComplete(latestOrderRecord);
    } else {
      onOrderComplete();
    }
    onClose();
  };

  const copyOrderNo = () => {
    navigator.clipboard?.writeText(generatedOrderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPaymentName = () => {
    switch (formData.paymentMethod) {
      case 'card':
        return '신용/체크카드 (연습용 테스트 승인)';
      case 'naverpay':
        return '네이버페이 (연습용 포인트 테스트)';
      case 'tosspay':
        return '토스페이 (연습용 1초 결제)';
      case 'kakaopay':
        return '카카오페이 (연습용 가상 결제)';
      case 'bank':
        return '무통장 입금 (연습용 가상계좌)';
      default:
        return '연습용 테스트 결제';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#F9F7F2] rounded-3xl shadow-2xl border-2 border-[#2D6A4F]/20 max-h-[92vh] overflow-y-auto z-10 p-6 sm:p-8 my-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-[#55695C] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 1. ORDER COMPLETE SUCCESS SCREEN */}
        {isSubmitted ? (
          <div className="text-center py-4 sm:py-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Celebration Icon */}
            <div className="w-20 h-20 rounded-full bg-[#E8F2EC] text-[#2D6A4F] flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CheckCircle className="w-12 h-12" />
            </div>

            <span className="inline-block px-3.5 py-1 bg-[#E8F2EC] text-[#2D6A4F] text-xs font-black rounded-full mb-2">
              연습용 결제 완료
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E3A2B] mb-2 tracking-tight">
              주문이 완료되었습니다!
            </h2>
            <p className="text-sm sm:text-base text-[#4E6254] mb-6">
              연습용 가짜 결제가 정상 승인되었습니다. 실제 돈은 결제되지 않았습니다.
            </p>

            {/* Prominent Generated Order Number Box (ORD-20261007-0324) */}
            <div className="bg-[#EFE9DD] border-2 border-[#2D6A4F]/30 p-5 rounded-2xl mb-6 text-center shadow-inner">
              <span className="text-xs font-bold text-[#6D5D4B] block mb-1">발급된 주문번호</span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-wider text-[#1E3A2B] font-mono">
                  {generatedOrderNumber}
                </span>
                <button
                  type="button"
                  onClick={copyOrderNo}
                  className="p-1.5 rounded-lg bg-white text-[#2D6A4F] hover:bg-[#E8F2EC] border border-[#D5CDBD] text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="주문번호 복사"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사됨' : '복사'}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#2D6A4F] font-bold mt-1.5">
                예시 주문번호가 정상 발급되었습니다.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white p-5 rounded-2xl border border-[#2D6A4F]/15 text-left mb-6 space-y-2.5 text-sm shadow-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#F4EFE6]">
                <span className="text-xs font-bold text-[#888888]">결제 상태</span>
                <span className="text-xs font-extrabold text-[#2D6A4F] bg-[#E8F2EC] px-2 py-0.5 rounded">
                  연습용 가상승인 (실제 결제액 0원)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687C6E]">결제 수단</span>
                <span className="font-bold text-[#1E3A2B]">{getPaymentName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687C6E]">받는 분</span>
                <span className="font-bold text-[#1E3A2B]">{formData.name} ({formData.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687C6E]">배송지</span>
                <span className="font-bold text-[#1E3A2B] text-right max-w-[260px] truncate">
                  {formData.address} {formData.detailAddress}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EAE4D7] flex justify-between items-baseline">
                <span className="text-base font-bold text-[#1E3A2B]">주문 금액 합계</span>
                <span className="text-2xl font-black text-[#2D6A4F]">
                  {totalAmount.toLocaleString()}원 (무료배송)
                </span>
              </div>
            </div>

            {/* Finish Button */}
            <button
              onClick={handleFinish}
              className="w-full h-15 bg-[#2D6A4F] text-white rounded-2xl text-xl font-black hover:bg-[#1E4D38] transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>확인 (쇼핑 계속하기)</span>
            </button>
          </div>
        ) : (
          /* 2. CHECKOUT INPUT FORM WITH BIG TEST NOTICE & PRE-FILLED CARD NUMBER */
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#2D6A4F]" />
              <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A2B] tracking-tight">주문 / 결제</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4E6254] mb-4">
              안전한 연습용 가상 결제 화면입니다.
            </p>

            {/* USER REQUIRED: BIG PROMINENT NOTICE THAT THIS IS PRACTICE TEST */}
            <div className="bg-[#FFF8E7] border-2 border-[#F59E0B] p-4 rounded-2xl mb-6 shadow-xs flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#B45309] leading-snug">
                  실제로 결제되지 않는 연습용입니다.
                </h3>
                <p className="text-xs sm:text-sm text-[#92400E] font-medium leading-relaxed mt-0.5">
                  진짜로 돈이 빠져나가지 않으니 안심하세요! 카드번호가 미리 입력되어 있으며 클릭 한 번으로 테스트 주문완료를 확인하실 수 있습니다.
                </p>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8E2D5] mb-5 space-y-2 shadow-xs">
              <span className="text-xs font-bold text-[#2D6A4F] block">주문 상품 확인</span>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                  <span className="font-bold text-[#1E3A2B] truncate max-w-[240px]">
                    {item.title} ({item.optionTitle}) × {item.quantity}개
                  </span>
                  <span className="font-extrabold text-[#1E3A2B] shrink-0">
                    {(item.price * item.quantity).toLocaleString()}원
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#F2ECE1] flex justify-between items-baseline font-black text-sm sm:text-base text-[#2D6A4F]">
                <span>총 결제금액 (전국 무료배송)</span>
                <span className="text-xl sm:text-2xl text-[#1E3A2B]">{totalAmount.toLocaleString()}원</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shipping info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2B] mb-1">받는 분 성함</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#D5CDBD] rounded-xl font-medium text-sm focus:border-[#2D6A4F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1E3A2B] mb-1">연락처</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#D5CDBD] rounded-xl font-medium text-sm focus:border-[#2D6A4F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E3A2B] mb-1">배송지 주소</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="기본 주소"
                    className="w-full px-3 py-2.5 bg-white border border-[#D5CDBD] rounded-xl font-medium text-sm focus:border-[#2D6A4F] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={formData.detailAddress}
                    onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })}
                    placeholder="상세 주소"
                    className="w-full px-3 py-2.5 bg-white border border-[#D5CDBD] rounded-xl font-medium text-sm focus:border-[#2D6A4F] focus:outline-none"
                  />
                </div>
              </div>

              {/* USER REQUIRED: ALL PAYMENT METHODS (네이버, 토스, 카카오페이, 카드결제) */}
              <div>
                <label className="block text-xs font-bold text-[#1E3A2B] mb-2">
                  결제 수단 선택 (연습용 시뮬레이션)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {/* 신용/체크카드 */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`py-3 px-2 rounded-xl border-2 text-xs font-black transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#2D6A4F] bg-[#E8F2EC] text-[#2D6A4F] shadow-sm'
                        : 'border-[#E0D8CA] bg-white text-[#55695C] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>신용/체크카드</span>
                  </button>

                  {/* 네이버페이 */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'naverpay' })}
                    className={`py-3 px-2 rounded-xl border-2 text-xs font-black transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      formData.paymentMethod === 'naverpay'
                        ? 'border-[#03C75A] bg-[#E8F9EE] text-[#03C75A] shadow-sm'
                        : 'border-[#E0D8CA] bg-white text-[#55695C] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#03C75A] text-white flex items-center justify-center text-[10px] font-black">N</span>
                    <span>네이버페이</span>
                  </button>

                  {/* 토스페이 */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'tosspay' })}
                    className={`py-3 px-2 rounded-xl border-2 text-xs font-black transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      formData.paymentMethod === 'tosspay'
                        ? 'border-[#0064FF] bg-[#EBF3FF] text-[#0064FF] shadow-sm'
                        : 'border-[#E0D8CA] bg-white text-[#55695C] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#0064FF] text-white flex items-center justify-center text-[10px] font-black">t</span>
                    <span>토스페이</span>
                  </button>

                  {/* 카카오페이 */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'kakaopay' })}
                    className={`py-3 px-2 rounded-xl border-2 text-xs font-black transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      formData.paymentMethod === 'kakaopay'
                        ? 'border-[#FEE500] bg-[#FFFDE6] text-[#3C1E1E] shadow-sm'
                        : 'border-[#E0D8CA] bg-white text-[#55695C] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#FEE500] text-[#3C1E1E] flex items-center justify-center text-[10px] font-black">P</span>
                    <span>카카오페이</span>
                  </button>
                </div>
              </div>

              {/* CARD DETAILS CONTAINER WITH PRE-FILLED 0000 - 0000 - 0000 - 0000 */}
              {formData.paymentMethod === 'card' && (
                <div className="bg-white p-4 rounded-2xl border-2 border-[#2D6A4F]/20 space-y-3 shadow-xs animate-in fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#1E3A2B]">카드 결제 정보 (연습용 자동 입력)</span>
                    <span className="text-[11px] font-bold text-[#2D6A4F] bg-[#E8F2EC] px-2 py-0.5 rounded">
                      테스트 번호 적용됨
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#55695C] mb-1">
                      카드번호 <span className="text-[#2D6A4F] font-normal">(연습용 0000이 미리 채워져 있습니다)</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      placeholder="0000 - 0000 - 0000 - 0000"
                      className="w-full px-3 py-3 bg-[#FAF8F4] border border-[#2D6A4F]/30 rounded-xl font-mono text-base font-black text-[#1E3A2B] tracking-wider focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#55695C] mb-1">유효기간</label>
                      <input
                        type="text"
                        value={formData.cardExpiry}
                        onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D5CDBD] rounded-xl font-mono text-sm font-bold text-[#1E3A2B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#55695C] mb-1">CVC (3자리)</label>
                      <input
                        type="text"
                        value={formData.cardCvc}
                        onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF8F4] border border-[#D5CDBD] rounded-xl font-mono text-sm font-bold text-[#1E3A2B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SIMULATED SIMPLE PAY BANNERS FOR NAVER/TOSS/KAKAO */}
              {formData.paymentMethod === 'naverpay' && (
                <div className="bg-[#E8F9EE] p-4 rounded-2xl border border-[#03C75A]/40 text-center text-xs font-bold text-[#028A3E]">
                  🟢 네이버페이 연습용 간편결제 모드: 포인트/머니 가상 차감으로 즉시 주문이 처리됩니다.
                </div>
              )}
              {formData.paymentMethod === 'tosspay' && (
                <div className="bg-[#EBF3FF] p-4 rounded-2xl border border-[#0064FF]/40 text-center text-xs font-bold text-[#0051CC]">
                  🔵 토스페이 연습용 간편결제 모드: 토스 앱 인증 없이 1초 가상 승인 처리됩니다.
                </div>
              )}
              {formData.paymentMethod === 'kakaopay' && (
                <div className="bg-[#FFFDE6] p-4 rounded-2xl border border-[#E6CE00] text-center text-xs font-bold text-[#6B5400]">
                  🟡 카카오페이 연습용 간편결제 모드: 카카오머니 가상 차감으로 즉시 주문이 처리됩니다.
                </div>
              )}

              {/* USER REQUIRED: BIG "결제하기" BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-16 bg-[#2D6A4F] hover:bg-[#1E4D38] active:scale-[0.99] text-white rounded-2xl text-xl font-black shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>연습용 결제 승인 중...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-[#A3E635]" />
                      <span>{totalAmount.toLocaleString()}원 결제하기 (연습용)</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-[#5C7062] mt-3">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <span>실제 금융 거래가 발생하지 않는 100% 안전한 연습용 시스템입니다.</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
