import React, { useState } from "react";
import DeepColor from "../assets/images/deep_color.png";
import BrightColor from "../assets/images/bright_color.png";
import DecafColor from "../assets/images/decaf_color.png";
import Deep_product1 from "../assets/images/deep_product_1.png";
import Deep_product2 from "../assets/images/deep_product_2.png";
import Bright_product1 from "../assets/images/bright_product_1.png";
import Bright_product2 from "../assets/images/bright_product_2.png";
import Decaf_product1 from "../assets/images/decaf_product_1.png";
import Decaf_product2 from "../assets/images/decaf_product_2.png";


// Props 인터페이스 정의
interface ProductSectionProps {
  productRef: React.RefObject<HTMLDivElement | null>;
}

export default function ProductSection({ productRef }: ProductSectionProps) {
  // activeProduct 상태 변수: 선택된 상품의 번호 (0, 1, 2) 또는 닫힌 상태 (null)
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  // 상품 전체 정보 배열 선언 - 각 아코디언 상세 "이미지 + 설명글" 세트 포함
  const products = [
    {
      name: "DEEP EDITION",
      desc: "orange chocolat & creamy nut",
      image: DeepColor,
      accordionDetails: [
        {
          image: Deep_product1,
          title: "검증된 조합의 현대적 재해석, 오랑주 쇼콜라",
          desc: "오래 사랑받는 조합엔 다 이유가 있지, 첫 입에 알 수 있어. 짙은 다크초콜릿이 만든 무드 위로 번지는 오렌지의 산뜻한 킥. 모두가 고개를 끄덕이는 클래식한 위트, 빠지는 건 한순간이야.",
        },
        {
          image: Deep_product2,
          title: "아는 맛이 무서운, 크리미넛",
          desc: "갓 구운 쿠키 향처럼 그냥 지나치기 힘든 중독성. 마카다미아 뒤에 숨어 있는 크리미한 부드러움이 입안에서 사르르. 한 번 먹으면 헤어 나올 수 없어. 자꾸 생각나는 꽉 찬 행복.",
        },
      ],
    },
    {
      name: "BRIGHT EDITION",
      desc: "lychee sorbet & peach melba",
      image: BrightColor,
      accordionDetails: [
        {
          image: Bright_product1,
          title: "LYCHEE SORBET BREEZE",
          desc: "리치 소르베의 싱그럽고 톡톡 튀는 청량감이 가득 스며들어, 피로를 단번에 날려주는 지고의 자유로움을 선물합니다.",
        },
        {
          image: Bright_product2,
          title: "PEACH MELBA FRUITY",
          desc: "달콤하고 부드러운 피치 멜바 향이 입안을 프랑스 마르세유 테라스처럼 고급스럽고 아름다운 아로마로 장식합니다.",
        },
      ],
    },
    {
      name: "DECAF EDITION",
      desc: "pistachio ganache & apricot atelier",
      image: DecafColor,
      accordionDetails: [
        {
          image: Decaf_product1,
          title: "PISTACHIO GANACHE",
          desc: "피스타치오 가나슈의 벨벳같이 감미로운 터치와 고소함이 돋보이며, 지친 일상에 풍요로운 쉼표가 되어 줍니다.",
        },
        {
          image: Decaf_product2,
          title: "APRICOT ATELIER",
          desc: "향긋하고 섬세한 살구 아틀리에의 조화로운 무드가 은은하게 이어지며 깊은 밤, 완벽하게 디카페인으로 안심하고 취하는 특별한 여유를 제공합니다.",
        },
      ],
    },
  ];

  // 카드 클릭 시 토글 핸들러
  const handleProductClick = (index: number) => {
    if (activeProduct === index) {
      setActiveProduct(null);
    } else {
      setActiveProduct(index);
    }
  };

  // 제목 문자열을 콤마 기준으로 [검정 부분 / 컬러 부분]으로 분리
  // 예) "검증된 조합의 현대적 재해석, 오랑주 쇼콜라" → black: "검증된 조합의 현대적 재해석,", color: "오랑주 쇼콜라"
  // 콤마가 없으면 전체를 컬러 부분으로 처리 (예: "LYCHEE SORBET BREEZE")
  const splitTitle = (title: string) => {
    const idx = title.indexOf(",");
    if (idx === -1) return { black: "", color: title };
    return { black: title.slice(0, idx + 1), color: title.slice(idx + 1).trim() };
  };

  // 아코디언 내부 공통 콘텐츠 (데스크탑/모바일 동일 구조 공유)
  // 구조: 상품명 → 상세 이미지(한 줄) → [검정 title + 컬러 title(한 줄)] → 설명글  (디테일 수만큼 반복)
  const renderAccordionContent = (product: (typeof products)[number]) => (
    <div className="flex flex-col w-full">
      {/* 상품명 */}
      <h3
        className="text-center font-semibold text-[#000000] uppercase text-3xl sm:text-4xl lg:text-5xl xl:text-[55px] xl:leading-[65px] font-sans"
        style={{ letterSpacing: "-0.04em" }}
      >
        {product.name}
      </h3>

      {/* 상세 상품 이미지 (한 줄에 나란히 배치) */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-[820px] mx-auto w-full mt-6 md:mt-10 lg:mt-[60px]">
        {product.accordionDetails.map((feat, fIdx) => (
          <div
            key={fIdx}
            className="w-full aspect-square overflow-hidden rounded-sm"
          >
            <img
              src={feat.image}
              alt={feat.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* 디테일별: [검정 title + 컬러 title(한 줄)] + 하단 설명글 */}
      <div className="flex flex-col space-y-8 md:space-y-12 lg:space-y-[60px] mt-8 md:mt-12 lg:mt-[80px]">
        {product.accordionDetails.map((feat, fIdx) => {
          const { black, color } = splitTitle(feat.title);
          // 컬러 title 색상: 0번 오렌지, 1번 블루 (교차)
          const colorClass = fIdx % 2 === 0 ? "text-[#ec7123]" : "text-[#468fcd]";
          return (
            <div key={fIdx} className="w-full flex flex-col">
              {/* 검정 title + 컬러 title 을 한 줄에 표시 */}
              <h4
                className="font-semibold text-xl sm:text-2xl lg:text-[28px] xl:text-[30px] xl:leading-[40px] font-sans"
                style={{ letterSpacing: "-0.025em" }}
                id={`accordion-feat-title-${fIdx}`}
              >
                {black && <span className="text-[#000000]">{black} </span>}
                <span className={colorClass}>{color}</span>
              </h4>
              {/* 하단 설명글 */}
              <p
                className="text-[#000000]/85 font-normal text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-[40px] xl:leading-[60px] mt-2 xl:mt-4 font-sans"
                style={{ letterSpacing: "-0.025em" }}
                id={`accordion-feat-desc-${fIdx}`}
              >
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      ref={productRef}
      // 상하 내부 여백 100 (xl:py-[100px])
      className="bg-[#fae6aa] py-10 md:py-16 lg:py-24 xl:py-[100px] w-full"
      id="product-section"
    >
      {/* 좌우 내부 여백 100 (xl:px-[100px]) */}
      <div
        className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full max-w-[1980px] mx-auto"
        id="product-inner-container"
      >
        {/* 제품(3개 - 동일간격 배치) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-[6%]"
          id="product-cards-grid"
        >
          {products.map((item, index) => {
            const isSelected = activeProduct === index;
            // 선택된 상품이 있고, 이 카드가 선택되지 않았다면 흑백 처리
            const isDimmed = activeProduct !== null && !isSelected;
            return (
              <div
                key={index}
                className="flex flex-col w-full xl:max-w-[442px] mx-auto"
                id={`product-card-wrapper-${index}`}
              >
                <div
                  onClick={() => handleProductClick(index)}
                  // 카드 내의 여백 제거 (p-0), 백그라운드 컬러 삭제, border 삭제, shadow 삭제
                  className="flex flex-col cursor-pointer bg-transparent p-0 border-0 shadow-none transition-all duration-300 relative select-none w-full"
                  id={`product-card-${index}`}
                >
                  {/* 이미지 크기: 가변적 비율 유지하며 최대 442*442 */}
                  <div
                    className="w-full aspect-square overflow-hidden rounded-sm relative"
                    id={`product-image-container-${index}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      // 미선택 상품은 흑백(grayscale), 선택/전체노출 상품은 컬러로 부드럽게 전환
                      className={`w-full h-full object-cover transition-all duration-500 hover:scale-102 ${
                        isDimmed ? "grayscale" : "grayscale-0"
                      }`}
                      loading="lazy"
                      id={`product-img-${index}`}
                    />
                  </div>

                  {/* 텍스트 영역 */}
                  <div
                    className="mt-4 md:mt-6 xl:mt-[30px] flex flex-col space-y-1 md:space-y-2"
                    id={`product-info-text-${index}`}
                  >
                    {/* 상품명 텍스트: 사이즈 30, regular, 자간 -40 */}
                    <h3
                      className="font-normal text-[#000000] text-xl sm:text-2xl lg:text-[28px] xl:text-[30px] xl:leading-[40px] uppercase font-sans"
                      style={{ letterSpacing: "-0.04em" }}
                      id={`product-title-${index}`}
                    >
                      {item.name}
                    </h3>
                    {/* 설명글 텍스트: 사이즈 25, regular, 자간 -40 */}
                    <p
                      className="text-[#000000]/85 font-normal text-base sm:text-lg lg:text-xl xl:text-[25px] xl:leading-[35px] font-sans"
                      style={{ letterSpacing: "-0.04em" }}
                      id={`product-desc-${index}`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* 보기 편한 인터랙션 표시 */}
                  <div
                    className="mt-2 flex justify-start pb-2"
                    id={`product-badge-row-${index}`}
                  >
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                        isSelected
                          ? "text-[#468fcd]"
                          : "text-[#ec7123] hover:text-[#ec7123]/80"
                      }`}
                      id={`product-indicator-${index}`}
                    >
                      {isSelected ? "CLOSE ▲" : "DETAIL ▼"}
                    </span>
                  </div>
                </div>

                {/* 모바일 뷰 전용 아코디언 (Mobile View 전용: lg 미만에서만 표출, 각 상품 하단에 열림) */}
                <div
                  className={`lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${
                    isSelected
                      ? "max-h-[4000px] opacity-100 mt-6 mb-8"
                      : "max-h-0 opacity-0 mt-0 mb-0"
                  }`}
                  id={`product-mobile-accordion-${index}`}
                >
                  {renderAccordionContent(item)}
                </div>
              </div>
            );
          })}
        </div>

        {/* 제품설명 아코디언 (Desktop View 전용: 그리드 하단에 선택 상품 1개 표출) */}
        <div
          className={`hidden lg:block overflow-hidden transition-all duration-700 ease-in-out ${
            activeProduct !== null
              ? "max-h-[6000px] opacity-100 mt-10 md:mt-16 xl:mt-[100px]"
              : "max-h-0 opacity-0 mt-0"
          }`}
          id="product-detail-accordion"
        >
          {activeProduct !== null && renderAccordionContent(products[activeProduct])}
        </div>
      </div>
    </section>
  );
}
