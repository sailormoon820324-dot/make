import React, { useState } from 'react';
import { ShoppingBag, Menu, X, User, Sparkles, Building2, BookOpen, PackageCheck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  orderCount: number;
  onOpenCart: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenCompany: () => void;
  onOpenProductDetail: () => void;
  onOpenOrderManagement: () => void;
  onScrollTo: (elementId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  orderCount,
  onOpenCart,
  onOpenAuth,
  onOpenCompany,
  onOpenProductDetail,
  onOpenOrderManagement,
  onScrollTo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#2D6A4F]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name: Daoom begin with nature */}
          <button
            onClick={() => onScrollTo('hero')}
            className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer"
          >
            <img
              src="/images/daoom_logo.svg"
              alt="daoom begin with nature"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </button>

          {/* Desktop Right Navigation: 홈 회사소개 제품설명 상품주문하기 장바구니 로그인 회원가입 */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => onScrollTo('hero')}
              className="px-3 py-2 text-[15px] font-bold text-[#1E3A2B] hover:text-[#2D6A4F] transition-colors rounded-lg cursor-pointer"
            >
              홈
            </button>
            <button
              onClick={onOpenCompany}
              className="px-3 py-2 text-[15px] font-bold text-[#2D4536] hover:text-[#2D6A4F] transition-colors rounded-lg cursor-pointer"
            >
              회사소개
            </button>
            <button
              onClick={onOpenProductDetail}
              className="px-3 py-2 text-[15px] font-bold text-[#2D4536] hover:text-[#2D6A4F] transition-colors rounded-lg cursor-pointer"
            >
              제품설명
            </button>
            <button
              onClick={() => onScrollTo('categories-section')}
              className="px-3 py-2 text-[15px] font-bold text-[#2D4536] hover:text-[#2D6A4F] transition-colors rounded-lg cursor-pointer"
            >
              사업영역
            </button>
            <button
              onClick={() => onScrollTo('order-section')}
              className="px-4 py-2 text-[15px] font-extrabold text-white bg-[#2D6A4F] hover:bg-[#1E4D38] rounded-xl transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer flex items-center gap-1.5 ml-1"
            >
              <Sparkles className="w-4 h-4 text-[#A3E635]" />
              상품주문하기
            </button>

            <div className="h-4 w-px bg-[#2D6A4F]/20 mx-2" aria-hidden="true" />

            {/* 장바구니 */}
            <button
              onClick={onOpenCart}
              className="relative px-3 py-2 text-[15px] font-bold text-[#1E3A2B] hover:text-[#2D6A4F] transition-colors rounded-lg flex items-center gap-1.5 cursor-pointer"
              aria-label="장바구니 열기"
            >
              <ShoppingBag className="w-5 h-5 text-[#2D6A4F]" />
              <span>장바구니</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-[#D9534F] rounded-full min-w-[18px]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* 로그인 */}
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3 py-2 text-[14px] font-bold text-[#55695C] hover:text-[#1E3A2B] transition-colors rounded-lg cursor-pointer"
            >
              로그인
            </button>

            {/* 회원가입 */}
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-3 py-1.5 text-[14px] font-bold text-[#2D6A4F] bg-[#E8F2EC] hover:bg-[#D5E8DC] rounded-lg transition-colors cursor-pointer"
            >
              회원가입
            </button>

            {/* 판매자 주문관리 바로가기 버튼 */}
            <button
              onClick={onOpenOrderManagement}
              className="ml-1 px-3 py-1.5 text-[14px] font-black text-[#1E3A2B] bg-[#FAF7F0] hover:bg-[#EAE4D7] border-2 border-[#2D6A4F]/30 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group"
              title="판매자 실시간 주문 관리 화면을 엽니다"
            >
              <PackageCheck className="w-4 h-4 text-[#2D6A4F] group-hover:scale-110 transition-transform" />
              <span>주문관리</span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black text-white bg-[#15803D] rounded-full min-w-[18px]">
                {orderCount}
              </span>
            </button>
          </nav>

          {/* Mobile Right Controls: Order Management, Cart & Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <button
              onClick={onOpenOrderManagement}
              className="relative p-2.5 rounded-xl bg-[#FAF7F0] text-[#1E3A2B] border border-[#2D6A4F]/20 hover:bg-[#EAE4D7] transition-colors flex items-center gap-1"
              aria-label="주문관리"
              title="주문관리"
            >
              <PackageCheck className="w-5 h-5 text-[#2D6A4F]" />
              <span className="text-xs font-black hidden xs:inline">주문</span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-[#15803D] rounded-full min-w-[18px]">
                {orderCount}
              </span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#E8F2EC] text-[#2D6A4F] hover:bg-[#DAEADB] transition-colors"
              aria-label="장바구니"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-[#D9534F] rounded-full min-w-[20px]">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#1E3A2B] hover:bg-[#EAE4D7] transition-colors"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2D6A4F]/15 bg-[#F9F7F2] px-5 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          {/* Seller Order Management Banner on mobile drawer */}
          <button
            onClick={() => handleNavClick(onOpenOrderManagement)}
            className="w-full mb-3 py-3 px-4 bg-[#F2ECE1] border-2 border-[#2D6A4F]/30 rounded-xl text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-[#2D6A4F]" />
              <span className="text-sm font-black text-[#1E3A2B]">판매자 실시간 주문관리</span>
            </div>
            <span className="px-2 py-0.5 text-xs font-black text-white bg-[#15803D] rounded-full">
              총 {orderCount}건
            </span>
          </button>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => handleNavClick(() => onScrollTo('hero'))}
              className="h-12 bg-white text-[#1E3A2B] border border-[#2D6A4F]/20 rounded-xl text-base font-bold flex items-center justify-center shadow-sm"
            >
              홈
            </button>
            <button
              onClick={() => handleNavClick(onOpenCompany)}
              className="h-12 bg-white text-[#1E3A2B] border border-[#2D6A4F]/20 rounded-xl text-base font-bold flex items-center justify-center shadow-sm gap-1.5"
            >
              <Building2 className="w-4 h-4 text-[#2D6A4F]" />
              회사소개
            </button>
            <button
              onClick={() => handleNavClick(onOpenProductDetail)}
              className="h-12 bg-white text-[#1E3A2B] border border-[#2D6A4F]/20 rounded-xl text-base font-bold flex items-center justify-center shadow-sm gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-[#2D6A4F]" />
              제품설명
            </button>
            <button
              onClick={() => handleNavClick(onOpenCart)}
              className="h-12 bg-white text-[#1E3A2B] border border-[#2D6A4F]/20 rounded-xl text-base font-bold flex items-center justify-center shadow-sm gap-1.5"
            >
              <ShoppingBag className="w-4 h-4 text-[#2D6A4F]" />
              장바구니 ({cartCount})
            </button>
          </div>

          {/* Big Order Button on mobile menu */}
          <button
            onClick={() => handleNavClick(() => onScrollTo('order-section'))}
            className="w-full h-14 bg-[#2D6A4F] text-white rounded-xl text-lg font-extrabold flex items-center justify-center gap-2 shadow-md hover:bg-[#1E4D38] active:scale-[0.98] transition-all mb-4"
          >
            <Sparkles className="w-5 h-5" />
            상품주문하기 (바로가기)
          </button>

          {/* User Auth Buttons in mobile */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#2D6A4F]/10">
            <button
              onClick={() => handleNavClick(() => onOpenAuth('login'))}
              className="flex-1 py-3 text-center text-sm font-bold text-[#1E3A2B] bg-[#EFE9DD] rounded-xl hover:bg-[#E5DDCF]"
            >
              로그인
            </button>
            <button
              onClick={() => handleNavClick(() => onOpenAuth('signup'))}
              className="flex-1 py-3 text-center text-sm font-bold text-[#2D6A4F] bg-[#E8F2EC] rounded-xl hover:bg-[#D8EADB]"
            >
              회원가입
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
