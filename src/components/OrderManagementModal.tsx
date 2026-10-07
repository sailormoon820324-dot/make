import React, { useState, useEffect } from 'react';
import { OrderRecord, OrderStatus } from '../types';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, Sparkles, User, Phone, MapPin, Volume2, ToggleLeft, ToggleRight, Radio } from 'lucide-react';

interface OrderManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
  onUpdateStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onSimulateNewOrder: () => void;
  autoSimulate: boolean;
  onToggleAutoSimulate: () => void;
}

export const OrderManagementModal: React.FC<OrderManagementModalProps> = ({
  isOpen,
  onClose,
  orders,
  onUpdateStatus,
  onSimulateNewOrder,
  autoSimulate,
  onToggleAutoSimulate,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [justUpdatedId, setJustUpdatedId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter & Search
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === '전체' || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.itemsSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Metric counts
  const totalCount = orders.length;
  const paidCount = orders.filter((o) => o.status === '결제완료').length;
  const shippingCount = orders.filter((o) => o.status === '배송중').length;
  const deliveredCount = orders.filter((o) => o.status === '배송완료').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleStatusChangeWithFeedback = (orderId: string, status: OrderStatus) => {
    onUpdateStatus(orderId, status);
    setJustUpdatedId(orderId);
    setTimeout(() => setJustUpdatedId(null), 2500);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case '결제완료':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
            <Clock className="w-3.5 h-3.5" />
            결제완료 (배송대기)
          </span>
        );
      case '배송중':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]">
            <Truck className="w-3.5 h-3.5" />
            배송중
          </span>
        );
      case '배송완료':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            배송완료
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-6xl bg-[#F9F7F2] rounded-3xl shadow-2xl border-2 border-[#2D6A4F]/25 max-h-[94vh] flex flex-col z-10 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#2D6A4F]/15 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#2D6A4F] text-white text-xs font-black rounded-full">
                판매자 전용 주문관리
              </span>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#BBF7D0]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-ping" />
                <span>새로고침 없이 실시간 자동 갱신 중</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A2B] tracking-tight mt-1.5">
              실시간 주문 접수 및 배송 관리
            </h2>
            <p className="text-xs sm:text-sm text-[#5C7062] mt-0.5">
              고객이 쇼핑몰에서 결제하면 페이지를 새로고침하지 않아도 최상단에 즉시 새 주문이 표시됩니다.
            </p>
          </div>

          {/* Quick Actions & Live Simulation Toggle */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Auto Live Order Generator Toggle */}
            <button
              onClick={onToggleAutoSimulate}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                autoSimulate
                  ? 'bg-[#15803D] text-white border-[#15803D] shadow-xs'
                  : 'bg-[#F2ECE1] text-[#55695C] border-[#D5CDBD] hover:bg-[#E5DDCF]'
              }`}
              title="새 주문이 12초마다 자동으로 들어오는 실시간 시뮬레이션입니다"
            >
              <Radio className={`w-4 h-4 ${autoSimulate ? 'animate-pulse text-[#A3E635]' : ''}`} />
              <span>실시간 자동 수신 {autoSimulate ? 'ON' : 'OFF'}</span>
            </button>

            {/* Instant Simulate Order Button */}
            <button
              onClick={onSimulateNewOrder}
              className="px-3.5 py-2 rounded-xl bg-[#2D6A4F] hover:bg-[#1E4D38] text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              title="지금 바로 새 주문 1건을 즉시 수신 테스트합니다"
            >
              <Sparkles className="w-4 h-4 text-[#A3E635]" />
              <span>새 주문 즉시 추가</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#55695C] hover:bg-[#EAE4D7] transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Top Summary Stat Cards */}
        <div className="p-3.5 sm:p-5 bg-[#F4EFE6] border-b border-[#E5DECD] shrink-0">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
            {/* 전체 주문 */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#E0D8CA] shadow-2xs">
              <span className="text-xs font-bold text-[#6D7F72] block">전체 주문</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#1E3A2B]">{totalCount}건</span>
                <PackageCheck className="w-4 h-4 text-[#8C7A6B]" />
              </div>
            </div>

            {/* 결제완료 (배송대기) */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#FDE68A] shadow-2xs">
              <span className="text-xs font-bold text-[#D97706] block">결제완료 (대기)</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#D97706]">{paidCount}건</span>
                <Clock className="w-4 h-4 text-[#D97706]" />
              </div>
            </div>

            {/* 배송중 */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#BFDBFE] shadow-2xs">
              <span className="text-xs font-bold text-[#1D4ED8] block">배송중</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#1D4ED8]">{shippingCount}건</span>
                <Truck className="w-4 h-4 text-[#1D4ED8]" />
              </div>
            </div>

            {/* 배송완료 */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#BBF7D0] shadow-2xs">
              <span className="text-xs font-bold text-[#15803D] block">배송완료</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-[#15803D]">{deliveredCount}건</span>
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
              </div>
            </div>

            {/* 누적 주문 금액 */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#E0D8CA] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-xs font-bold text-[#6D7F72] block">총 주문 금액</span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-lg sm:text-xl font-black text-[#2D6A4F]">
                  {totalRevenue.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="px-4 sm:px-6 py-3 bg-white border-b border-[#EAE4D7] flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['전체', '결제완료', '배송중', '배송완료'].map((st) => {
              const isActive = filterStatus === st;
              return (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2D6A4F] text-white shadow-xs'
                      : 'bg-[#F2ECE1] text-[#4E6254] hover:bg-[#E5DDCF]'
                  }`}
                >
                  {st}
                  <span className="ml-1 text-[11px] opacity-80">
                    (
                    {st === '전체'
                      ? totalCount
                      : st === '결제완료'
                      ? paidCount
                      : st === '배송중'
                      ? shippingCount
                      : deliveredCount}
                    )
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#889B8E]" />
            <input
              type="text"
              placeholder="주문자 / 주문번호 / 상품 / 연락처 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#FAF8F5] border border-[#D5CDBD] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="flex-1 overflow-auto p-3 sm:p-6">
          {filteredOrders.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-[#7A8E81]">
              <PackageCheck className="w-12 h-12 stroke-1 text-[#A9BCB0] mb-3" />
              <p className="text-base font-bold text-[#1E3A2B]">검색 조건에 맞는 주문이 없습니다.</p>
              <p className="text-xs text-[#526859] mt-0.5">상단의 [새 주문 즉시 추가] 버튼을 클릭해 실시간 주문을 추가해보세요.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border-2 border-[#2D6A4F]/15 bg-white shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm divide-y divide-[#EAE4D7]">
                <thead className="bg-[#F6F2E9] text-[#2D4536] font-black text-xs uppercase tracking-wide">
                  <tr>
                    <th className="py-4 px-4 whitespace-nowrap">주문번호 / 일시</th>
                    <th className="py-4 px-4 whitespace-nowrap">주문자 정보</th>
                    <th className="py-4 px-4 whitespace-nowrap">주문 상품</th>
                    <th className="py-4 px-4 whitespace-nowrap">결제 금액</th>
                    <th className="py-4 px-4 text-center whitespace-nowrap">현재 상태</th>
                    <th className="py-4 px-4 text-center whitespace-nowrap">상태 변경 관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE1]">
                  {filteredOrders.map((order) => {
                    const isRowNew = order.isNew;
                    const isJustUpdated = justUpdatedId === order.id;

                    return (
                      <tr
                        key={order.id}
                        className={`transition-colors ${
                          isJustUpdated
                            ? 'bg-[#FEFCE8]'
                            : isRowNew
                            ? 'bg-[#EBF7EF] border-l-4 border-l-[#15803D]'
                            : 'hover:bg-[#FAF8F4]'
                        }`}
                      >
                        {/* 1. 주문번호 / 일시 */}
                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-black text-[#1E3A2B] text-sm">
                              {order.id}
                            </span>
                            {isRowNew && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#D9534F] text-white animate-pulse">
                                NEW 실시간
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#718576] block mt-1 font-medium">
                            {order.orderTime}
                          </span>
                        </td>

                        {/* 2. 주문자 */}
                        <td className="py-4 px-4 align-top min-w-[170px]">
                          <div className="font-black text-[#1E3A2B] text-sm flex items-center gap-1">
                            <span>{order.customerName}</span>
                          </div>
                          <span className="text-xs text-[#2D6A4F] font-bold block mt-0.5">
                            {order.customerPhone}
                          </span>
                          <span
                            className="text-[11px] text-[#7D6B5A] block mt-1 line-clamp-2"
                            title={order.shippingAddress}
                          >
                            📍 {order.shippingAddress}
                          </span>
                        </td>

                        {/* 3. 주문 상품 */}
                        <td className="py-4 px-4 align-top min-w-[200px]">
                          <span className="font-bold text-[#1E3A2B] block leading-snug text-sm">
                            {order.itemsSummary}
                          </span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {order.items.map((item, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-[#F4EFE6] text-[#55695C] text-[11px] px-2 py-0.5 rounded font-medium"
                              >
                                {item.optionTitle || item.title} ({item.quantity}개)
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* 4. 결제 금액 */}
                        <td className="py-4 px-4 align-top whitespace-nowrap">
                          <span className="font-black text-[#1E3A2B] text-base block">
                            {order.totalAmount.toLocaleString()}원
                          </span>
                          <span className="text-[11px] font-bold text-[#2D6A4F] block mt-0.5">
                            무료배송
                          </span>
                          <span className="text-[11px] text-[#728578] block truncate max-w-[140px] mt-0.5">
                            {order.paymentMethod}
                          </span>
                        </td>

                        {/* 5. 현재 상태 */}
                        <td className="py-4 px-4 align-top text-center whitespace-nowrap">
                          <div className="inline-block">
                            {getStatusBadge(order.status)}
                          </div>
                        </td>

                        {/* 6. USER REQUIRED: "배송중" "배송완료"로 바꾸는 버튼 */}
                        <td className="py-4 px-4 align-top text-center whitespace-nowrap">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                            {/* "배송중" 버튼 */}
                            <button
                              onClick={() => handleStatusChangeWithFeedback(order.id, '배송중')}
                              className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all cursor-pointer shadow-xs ${
                                order.status === '배송중'
                                  ? 'bg-[#1D4ED8] text-white ring-2 ring-[#1D4ED8]/30'
                                  : 'bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#BFDBFE]'
                              }`}
                              title="상태를 배송중으로 변경합니다"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>배송중</span>
                            </button>

                            {/* "배송완료" 버튼 */}
                            <button
                              onClick={() => handleStatusChangeWithFeedback(order.id, '배송완료')}
                              className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1 transition-all cursor-pointer shadow-xs ${
                                order.status === '배송완료'
                                  ? 'bg-[#15803D] text-white ring-2 ring-[#15803D]/30'
                                  : 'bg-[#DCFCE7] text-[#15803D] hover:bg-[#BBF7D0]'
                              }`}
                              title="상태를 배송완료로 변경합니다"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>배송완료</span>
                            </button>

                            {/* Revert / Custom select */}
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChangeWithFeedback(order.id, e.target.value as OrderStatus)
                              }
                              className="text-xs bg-[#FAF8F5] border border-[#D5CDBD] text-[#55695C] rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                              title="상태 세부 선택"
                            >
                              <option value="결제완료">결제완료</option>
                              <option value="배송중">배송중</option>
                              <option value="배송완료">배송완료</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#2D6A4F]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C7062] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-pulse" />
            <span className="font-bold text-[#1E3A2B]">
              실시간 동기화 상태: 새로고침이 필요 없으며, 변경된 상태는 즉시 반영됩니다.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#2D6A4F] text-white font-extrabold rounded-xl hover:bg-[#1E4D38] transition-colors cursor-pointer text-sm"
          >
            관리창 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

