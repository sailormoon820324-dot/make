import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenCompany: () => void;
  onOpenProductDetail: () => void;
  onScrollToOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCompany,
  onOpenProductDetail,
  onScrollToOrder,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#A0A0A0] pt-12 pb-24 lg:pb-12 text-xs sm:text-[13px] border-t border-[#222222] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#252525]">
          {/* Company info matching screenshot */}
          <div className="space-y-1.5 leading-relaxed text-[#B0B0B0]">
            <p className="font-bold text-[#E0E0E0]">
              (주)다움 <span className="font-normal text-[#888888]">|</span> 사업자등록번호 : 126-81-10702
            </p>
            <p>본사 : 경상남도 사천시 송포공단길 81-10</p>
            <p>서울사무소 : 서울특별시 광진구 천호대로 840 (다움앤다움빌딩) 1층</p>
            <p>
              OEM전용 : 070-7730-4395 <span className="text-[#666666]">|</span> 홍보&amp;마케팅 : 070-7730-4395 <span className="text-[#666666]">|</span> 해외영업부 : 070-7730-4397
            </p>
            <p>
              E-mail. daoomall@naver.com <span className="text-[#666666]">|</span> Fax. 02-3446-0631
            </p>
          </div>

          {/* Social Icons matching screenshot */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center font-bold text-sm shadow-sm hover:opacity-90 transition-opacity"
              aria-label="Instagram"
            >
              📷
            </a>
            {/* Kakao */}
            <a
              href="https://kakao.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#FEE500] text-[#3C1E1E] flex items-center justify-center font-black text-sm shadow-sm hover:opacity-90 transition-opacity"
              aria-label="KakaoTalk"
            >
              TALK
            </a>
            {/* Naver Blog */}
            <a
              href="https://blog.naver.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#03C75A] text-white flex items-center justify-center font-black text-xs shadow-sm hover:opacity-90 transition-opacity"
              aria-label="Naver Blog"
            >
              blog
            </a>
          </div>
        </div>

        {/* Quick Links & Legal disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[#777777] text-xs">
          <div>
            <p>Copyright©2023 DAOOM All Rights Reserved.</p>
            <p className="mt-1 text-[11px] text-[#555555]">
              * 본 제품은 일반가공식품(생식함유식품)으로 질병의 예방 및 치료를 위한 의약품이 아닙니다.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#888888]">
            <button onClick={onOpenCompany} className="hover:text-white transition-colors cursor-pointer">
              회사소개
            </button>
            <button onClick={onOpenProductDetail} className="hover:text-white transition-colors cursor-pointer">
              제품설명 &amp; 50곡 전성분
            </button>
            <button onClick={onScrollToOrder} className="hover:text-white transition-colors cursor-pointer">
              상품주문하기
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top button matching screenshot */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-6 sm:bottom-8 sm:right-8 z-30 w-11 h-11 rounded-full bg-[#333333]/80 hover:bg-[#2D6A4F] text-white flex items-center justify-center shadow-lg transition-all cursor-pointer backdrop-blur-xs"
        aria-label="위로 가기"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};
