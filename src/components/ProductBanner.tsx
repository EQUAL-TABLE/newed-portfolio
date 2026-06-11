export default function ProductBanner() {
  return (
    <section
      // 상하 내부 여백 100 (xl:py-[100px])
      className="bg-[#E8610A] py-10 md:py-16 xl:py-[100px] text-[#1A1A1A] w-full"
      id="product-banner-section"
    >
      {/* 1980px 너비 기준 좌우 내부 여백 100 (xl:px-[100px]) */}
      <div className="px-4 sm:px-8 md:px-16 xl:px-[100px] w-full max-w-[1980px] mx-auto" id="product-banner-inner-container">
        {/* 좌측 445 + 사이 간격 100 + 나머지 우측 구조 */}
        <div 
          className="flex flex-col xl:flex-row xl:gap-[100px] items-start w-full"
          id="product-banner-layout"
        >
          {/* 좌측 텍스트: 사이즈 100, 행간 120, 자간 -40 (-0.04em), semi bold */}
          <div className="w-full xl:w-[445px] xl:flex-shrink-0 select-none pb-4 xl:pb-0" id="product-banner-title-col">
            <h2
              className="font-semibold text-3xl sm:text-5xl md:text-6xl xl:text-[100px] xl:leading-[120px] uppercase font-sans"
              style={{ letterSpacing: "-0.04em" }}
              id="product-banner-heading"
            >
              PRODUCT
            </h2>
          </div>

          {/* 우측 설명 글: 사이즈 55, 행간 80, 자간 -40 (-0.04em), regular */}
          <div className="flex-1 w-full" id="product-banner-description-col">
            <p
              className="font-normal text-lg sm:text-xl md:text-2xl xl:text-[55px] xl:leading-[80px] font-sans"
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
