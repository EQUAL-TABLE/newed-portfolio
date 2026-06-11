export default function ProductBanner() {
  return (
    <section
      // 상하 내부 여백 100 (xl:py-[100px])
      className="bg-[#E8610A] py-10 md:py-16 lg:py-24 xl:py-[100px] text-[#1A1A1A] w-full"
      id="product-banner-section"
    >
      {/* 1980px 너비 기준 좌우 내부 여백 100 (xl:px-[100px]) */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full max-w-[1980px] mx-auto" id="product-banner-inner-container">
        {/* 좌측 약 25% + 사이 약 8% 간격 + 나머지 우측 구조 */}
        <div 
          className="flex flex-col xl:flex-row xl:gap-[8%] items-start w-full"
          id="product-banner-layout"
        >
          {/* 좌측 텍스트: 모바일에선 전체 너비, 데스크탑에선 약 25% 가변 너비 부여하되 최대 445px 확보 */}
          <div className="w-full xl:w-[25%] xl:max-w-[445px] xl:flex-shrink-0 select-none pb-4 xl:pb-0" id="product-banner-title-col">
            <h2
              className="font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[100px] xl:leading-[120px] uppercase font-sans"
              style={{ letterSpacing: "-0.04em" }}
              id="product-banner-heading"
            >
              PRODUCT
            </h2>
          </div>

          {/* 우측 설명 글: 사이즈 55, 행간 80, 자간 -40 (-0.04em), regular */}
          <div className="flex-1 w-full" id="product-banner-description-col">
            <p
              className="font-normal text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[55px] xl:leading-[80px] font-sans"
              style={{ letterSpacing: "-0.04em" }}
              id="product-banner-paragraph"
            >
              The scent hitting your nose, the flavor filling your mouth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
