/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IngredientsSection } from './components/IngredientsSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { HowToDrinkSection } from './components/HowToDrinkSection';
import { ProductOrderSection } from './components/ProductOrderSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderManagementModal } from './components/OrderManagementModal';
import { CompanyModal } from './components/CompanyModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AuthModal } from './components/AuthModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { DaoomProductCategories } from './components/DaoomProductCategories';
import { DaoomFamilyBanner } from './components/DaoomFamilyBanner';
import { Footer } from './components/Footer';
import { CartItem, ProductOption, ProductItem, OrderRecord, OrderStatus } from './types';
import { PRODUCT_DATA, INITIAL_ORDERS } from './data/saengsikData';
import { PackageCheck, Sparkles, X, ChevronRight, Bell } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial_cart_item',
      title: '다움 유기농 온가족 생식',
      optionTitle: '1박스 (30포 / 1개월분)',
      price: 54000,
      quantity: 1,
    },
  ]);

  // Order Management state (with initial seed data)
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [isOrderManagementOpen, setIsOrderManagementOpen] = useState(false);
  const [autoSimulate, setAutoSimulate] = useState(false);
  const [newOrderToast, setNewOrderToast] = useState<OrderRecord | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login',
  });
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Smooth scroll helper
  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    scrollTo('order-section');
  };

  // Add a newly received order to the list (instantly without reloading)
  const handleAddIncomingOrder = (newOrder: OrderRecord) => {
    setOrders(prev => [newOrder, ...prev]);
    setNewOrderToast(newOrder);
  };

  // Status changer for seller
  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status: nextStatus, isNew: false } : ord))
    );
  };

  // Simulate a realistic incoming order
  const handleSimulateSingleOrder = () => {
    const names = ['송지안', '강민우', '윤서아', '임태양', '오하은', '신재현', '배수아', '홍진우'];
    const addresses = [
      '서울특별시 마포구 월드컵북로 396 201호',
      '경기도 수원시 영통구 광교호수공원로 80 105동 802호',
      '부산광역시 수영구 광안해변로 225 302호',
      '대전광역시 유성구 대덕대로 512 1204호',
      '인천광역시 연수구 송도동 35-1 704호',
    ];
    const itemsSample = [
      {
        title: '다움 유기농 온가족 생식',
        optionTitle: '2박스 (60포 / 2개월분)',
        price: 99000,
        qty: 1,
      },
      {
        title: '다움 유기농 케일정',
        optionTitle: '1병 (450정 / 1.5개월분)',
        price: 42000,
        qty: 1,
      },
      {
        title: '다움 유기농 곡물 생효모',
        optionTitle: '1박스 (90포 / 1개월분)',
        price: 49000,
        qty: 2,
      },
      {
        title: '다움 유기농 온백 생식',
        optionTitle: '1박스 (30포 / 1개월분)',
        price: 58000,
        qty: 1,
      },
    ];

    const pickName = names[Math.floor(Math.random() * names.length)];
    const pickAddr = addresses[Math.floor(Math.random() * addresses.length)];
    const pickItem = itemsSample[Math.floor(Math.random() * itemsSample.length)];
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const total = pickItem.price * pickItem.qty;

    const simulatedOrder: OrderRecord = {
      id: `ORD-${yyyy}${mm}${dd}-${randomSuffix}`,
      orderTime: `${yyyy}-${mm}-${dd} ${hh}:${min}`,
      customerName: pickName,
      customerPhone: `010-${Math.floor(2000 + Math.random() * 8000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      shippingAddress: pickAddr,
      items: [
        {
          id: `sim_${Date.now()}`,
          title: pickItem.title,
          optionTitle: pickItem.optionTitle,
          price: pickItem.price,
          quantity: pickItem.qty,
        },
      ],
      itemsSummary: `${pickItem.title} (${pickItem.optionTitle}) × ${pickItem.qty}개`,
      totalAmount: total,
      paymentMethod: '네이버페이 / 카드 (자동 접수 테스트)',
      status: '결제완료',
      isNew: true,
    };

    handleAddIncomingOrder(simulatedOrder);
  };

  // Live order generator interval when autoSimulate is true
  useEffect(() => {
    if (!autoSimulate) return;
    const timer = setInterval(() => {
      handleSimulateSingleOrder();
    }, 12000);
    return () => clearInterval(timer);
  }, [autoSimulate]);

  // Auto-dismiss toast notification after 6 seconds
  useEffect(() => {
    if (!newOrderToast) return;
    const t = setTimeout(() => {
      setNewOrderToast(null);
    }, 6000);
    return () => clearTimeout(t);
  }, [newOrderToast]);

  // Add to cart
  const handleAddToCart = (option: ProductOption, quantity: number, productName?: string) => {
    const itemTitle = productName || PRODUCT_DATA.name;
    setCartItems(prev => {
      const existing = prev.find(item => item.title === itemTitle && item.optionTitle === option.title);
      if (existing) {
        return prev.map(item =>
          item.title === itemTitle && item.optionTitle === option.title
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `${option.id}_${Date.now()}`,
          title: itemTitle,
          optionTitle: option.title,
          price: option.price,
          quantity,
        },
      ];
    });
  };

  // Direct order
  const handleDirectOrder = (option: ProductOption, quantity: number, productName?: string) => {
    handleAddToCart(option, quantity, productName);
    setIsCheckoutOpen(true);
  };

  // Cart quantity update
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Cart remove item
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1E3A2B] flex flex-col font-sans selection:bg-[#2D6A4F] selection:text-white">
      {/* Top Banner Notice: Free shipping & honest food + Seller order shortcut */}
      <div className="bg-[#2D6A4F] text-white py-2 px-4 text-center text-xs sm:text-sm font-bold flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <span>🌿 100% 국내산 50곡 비가열 생식 | 전 상품 무료배송 혜택</span>
        {currentUser && (
          <span className="hidden sm:inline bg-white/20 px-2 py-0.5 rounded text-xs">
            {currentUser}님 환영합니다
          </span>
        )}
        <button
          onClick={() => setIsOrderManagementOpen(true)}
          className="ml-2 bg-[#FAF7F0] text-[#1E3A2B] hover:bg-white px-2.5 py-0.5 rounded-full text-xs font-black inline-flex items-center gap-1 transition-all shadow-xs cursor-pointer"
        >
          <PackageCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
          <span>판매자 주문관리 ({orders.length}건)</span>
        </button>
      </div>

      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        orderCount={orders.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onOpenCompany={() => setIsCompanyOpen(true)}
        onOpenProductDetail={() => setIsProductDetailOpen(true)}
        onOpenOrderManagement={() => setIsOrderManagementOpen(true)}
        onScrollTo={scrollTo}
      />

      {/* REAL-TIME NEW ORDER TOAST NOTIFICATION (Appears instantly without refresh) */}
      {newOrderToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed top-24 right-3 sm:right-6 z-50 bg-[#1E3A2B] text-white p-4 rounded-2xl shadow-2xl border-2 border-[#A3E635] flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-sm sm:max-w-md"
        >
          <div className="w-3 h-3 rounded-full bg-[#A3E635] animate-ping shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-black text-[#A3E635] flex items-center gap-1">
                <Bell className="w-3.5 h-3.5" />
                새 주문 실시간 도착 (새로고침 불필요)
              </span>
              <button
                onClick={() => setNewOrderToast(null)}
                className="text-white/60 hover:text-white p-1"
                aria-label="알림 닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-extrabold text-white mt-0.5 truncate">
              {newOrderToast.customerName} 고객님 • {newOrderToast.itemsSummary}
            </p>
            <div className="flex items-center justify-between text-xs text-[#E8F2EC] mt-1 font-mono">
              <span>{newOrderToast.id}</span>
              <span className="font-black text-[#A3E635]">
                {newOrderToast.totalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setNewOrderToast(null);
              setIsOrderManagementOpen(true);
            }}
            className="px-3.5 py-2 bg-[#2D6A4F] hover:bg-[#15803D] text-white text-xs font-black rounded-xl shrink-0 cursor-pointer transition-colors shadow-sm"
          >
            관리창 열기
          </button>
        </aside>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section: Daoom Dark Bowls Banner + "하루한잔,간편한 한끼" & Big "주문하기" button */}
        <HeroSection
          onScrollToOrder={() => scrollTo('order-section')}
          onOpenProductDetail={() => setIsProductDetailOpen(true)}
        />

        {/* 2. Official Daoom 4 Product Categories (Matching user's uploaded screenshot) */}
        <DaoomProductCategories
          onSelectProduct={handleSelectCategoryProduct}
          onScrollToTop={() => scrollTo('hero')}
        />

        {/* 3. 국내산 50가지 곡물,채소 소개 */}
        <IngredientsSection
          onOpenProductDetail={() => setIsProductDetailOpen(true)}
        />

        {/* 4. 이런분들께 좋아요 3가지 */}
        <TargetAudienceSection
          onScrollToOrder={() => scrollTo('order-section')}
        />

        {/* 5. 물이나 우유에 타서 드세요 (1 → 2 → 3 순서표시) */}
        <HowToDrinkSection />

        {/* 6. 상품 1개와 가격 & "주문하기" 큰 버튼 */}
        <ProductOrderSection
          selectedProduct={selectedProduct}
          onDirectOrder={handleDirectOrder}
          onAddToCart={handleAddToCart}
          onOpenProductDetail={() => setIsProductDetailOpen(true)}
        />

        {/* 7. Official Daoom Family Dining Banner ("가족의 건강과 행복한 삶을 생각하는 기업 주식회사 다움") */}
        <DaoomFamilyBanner />
      </main>

      {/* Sticky Mobile Floating Order Bar */}
      <MobileBottomBar onOrderClick={() => scrollTo('order-section')} />

      {/* Floating Seller Order Management Quick Access Button */}
      <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={() => setIsOrderManagementOpen(true)}
          className="bg-[#1E3A2B] hover:bg-[#153022] text-white px-4 py-3 rounded-2xl shadow-xl border-2 border-[#2D6A4F] flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 group"
          title="판매자 실시간 주문 관리창 열기"
        >
          <PackageCheck className="w-5 h-5 text-[#A3E635] group-hover:scale-110 transition-transform" />
          <div className="text-left leading-tight hidden sm:block">
            <span className="text-[11px] font-bold text-[#A3E635] block">판매자 관리자</span>
            <span className="text-xs font-black">실시간 주문관리 ({orders.length}건)</span>
          </div>
          <span className="sm:hidden text-xs font-black">주문관리</span>
          <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-ping" />
        </button>
      </div>

      {/* Footer with Compliance Notice */}
      <Footer
        onOpenCompany={() => setIsCompanyOpen(true)}
        onOpenProductDetail={() => setIsProductDetailOpen(true)}
        onScrollToOrder={() => scrollTo('order-section')}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems.length > 0 ? cartItems : [
          {
            id: 'default_checkout_item',
            title: PRODUCT_DATA.name,
            optionTitle: PRODUCT_DATA.options[0].title,
            price: PRODUCT_DATA.options[0].price,
            quantity: 1,
          }
        ]}
        onOrderComplete={(newOrder) => {
          setCartItems([]);
          if (newOrder) {
            handleAddIncomingOrder(newOrder);
          }
        }}
      />

      {/* USER REQUIRED: 판매자 실시간 주문관리 모달 화면 */}
      <OrderManagementModal
        isOpen={isOrderManagementOpen}
        onClose={() => setIsOrderManagementOpen(false)}
        orders={orders}
        onUpdateStatus={handleUpdateOrderStatus}
        onSimulateNewOrder={handleSimulateSingleOrder}
        autoSimulate={autoSimulate}
        onToggleAutoSimulate={() => setAutoSimulate(prev => !prev)}
      />

      <CompanyModal
        isOpen={isCompanyOpen}
        onClose={() => setIsCompanyOpen(false)}
        onScrollToOrder={() => scrollTo('order-section')}
      />

      <ProductDetailModal
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
        onScrollToOrder={() => scrollTo('order-section')}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        onSuccess={(email) => {
          setCurrentUser(email);
        }}
      />
    </div>
  );
}

