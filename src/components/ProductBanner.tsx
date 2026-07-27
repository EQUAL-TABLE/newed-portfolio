import { trackOutbound } from "../lib/analytics";

// Props 인터페이스 정의
interface ProductBannerProps {
  productBannerRef: React.RefObject<HTMLDivElement | null>;
}

// 와디즈 스토어 URL (모바일 SHOP 버튼 클릭 시 이동)
const WADIZ_STORE_URL =
  "https://www.wadiz.kr/web/campaign/detail/398459";
  
export default function ProductBanner({ productBannerRef }: ProductBannerProps) {
  const handleShopClick = () => {
    trackOutbound("shop_wadiz_productBanner", WADIZ_STORE_URL);
    window.open(WADIZ_STORE_URL, "_blank");
  };

  return (
    <section
      ref={productBannerRef}
      // 상하 내부 여백 100 (xl:py-[100px])
      className="bg-[#ec7123] py-8 md:py-16 lg:py-24 xl:py-[100px] text-[#000000] w-full"
      id="product-banner-section"
    >
      {/* 1980px 너비 기준 좌우 내부 여백 100 (xl:px-[100px]) */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full max-w-[1980px] mx-auto" id="product-banner-inner-container">
        {/* 좌측 약 25% + 사이 약 8% 간격 + 나머지 우측 구조 */}
        <div 
          className="flex flex-col lg:flex-row lg:gap-[8%] items-start w-full"
          id="product-banner-layout"
        >
          {/* 좌측 텍스트: 모바일에선 전체 너비, lg 이상 데스크탑에선 약 25% 가변 너비 부여하되 최대 445px 확보 */}
          <div className="w-full lg:w-[25%] lg:max-w-[445px] lg:flex-shrink-0 select-none pb-4 lg:pb-0" id="product-banner-title-col">
            <div className="flex items-center justify-between w-full">
              <h2
                className="font-semibold
                text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[70px]
                xl:leading-[40px] uppercase font-sans"
                style={{ letterSpacing: "-0.04em" }}
                id="product-banner-heading"
              >
                PRODUCT
              </h2>

              {/* SHOP 버튼: 모바일 전용(lg 미만), PRODUCT와 같은 라인의 오른쪽 끝 */}
              <button
                type="button"
                onClick={handleShopClick}
                className="lg:hidden  text-[#000000] font-bold uppercase font-sans
                rounded-full px-4 py-1.5 text-2xl sm:text-2xl md:text-2xl"
                id="product-banner-shop-button"
              >
                SHOP ▶
              </button>
            </div>
          </div>

          {/* 우측 설명 글: 사이즈 55, 행간 80, 자간 -40 (-0.04em), regular */}
          <div className="flex-1 w-full" id="product-banner-description-col">
            <p
              className="font-normal 
              text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[40px] 
              xl:leading-[40px] font-sans"
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
