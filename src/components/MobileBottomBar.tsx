import React from 'react';
import { Sparkles } from 'lucide-react';

interface MobileBottomBarProps {
  onOrderClick: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOrderClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#F9F7F2]/95 backdrop-blur-md border-t border-[#2D6A4F]/20 p-3 px-4 shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-[#526859] font-bold">다움 유기농 온가족 생식</span>
          <span className="text-lg font-black text-[#1E3A2B]">54,000원~ <span className="text-xs text-[#2D6A4F] font-bold">무료배송</span></span>
        </div>
        <button
          onClick={onOrderClick}
          className="flex-1 max-w-[200px] h-13 bg-[#2D6A4F] hover:bg-[#1E4D38] active:scale-95 text-white font-black text-lg rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#A3E635]" />
          <span>주문하기</span>
        </button>
      </div>
    </div>
  );
};
