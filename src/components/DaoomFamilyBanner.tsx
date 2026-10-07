import React from 'react';

export const DaoomFamilyBanner: React.FC = () => {
  return (
    <section className="relative h-72 sm:h-96 w-full overflow-hidden flex items-center justify-center text-center">
      {/* Background with warm family photo SVG */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/daoom_family_banner.svg"
          alt="다움 가족의 건강과 행복한 삶"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-xs" />
      </div>

      {/* Typography matching screenshot */}
      <div className="relative z-10 px-4 text-white max-w-2xl mx-auto">
        <p className="text-lg sm:text-2xl font-medium tracking-tight mb-2 drop-shadow-md text-[#F4EFE6]">
          가족의 건강과 행복한 삶을 생각하는 기업
        </p>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-lg text-white">
          주식회사 다움
        </h2>
      </div>
    </section>
  );
};
