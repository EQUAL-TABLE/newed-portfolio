import React, { useState } from "react";
import { trackProductClick, trackOutbound } from "../lib/analytics";

// 와디즈 스토어 URL (모바일 아코디언 상세 이미지 클릭 시 이동)
const WADIZ_STORE_URL =
  "https://www.wadiz.kr/web/wcomingsoon/rwd/399604?utm_source=wadizshare_in&utm_medium=share&sharer=1069001&walinkid=81502244";
import DeepColor from "../assets/images/deep_color.webp";
import BrightColor from "../assets/images/bright_color.webp";
import DecafColor from "../assets/images/decaf_color.webp";
import Deep_product1 from "../assets/images/deep_product_1.webp";
import Deep_product2 from "../assets/images/deep_product_2.webp";
import Bright_product1 from "../assets/images/bright_product_1.webp";
import Bright_product2 from "../assets/images/bright_product_2.webp";
import Decaf_product1 from "../assets/images/decaf_product_1.webp";
import Decaf_product2 from "../assets/images/decaf_product_2.webp";

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
      color: "#ec7123", // 활성화 시 상품명/컬러 타이틀에 적용되는 대표 색상
      desc: "orange chocolat & creamy nut",
      image: DeepColor,
      accordionDetails: [
        {
          image: Deep_product1,
          title: "검증된 조합의 현대적 재해석, 오랑주쇼콜라",
          desc: "오래 사랑받는 조합엔 다 이유가 있지. 첫  입에 알 수 있어 짙은 다크초콜릿이 만든 무드 위로 번지는 오렌지의 산뜻한 킥. 모두가 고개를 끄덕이는 클래식한 위트, 빠지는 건 한순간이야",
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
      color: "#468fcd", // 활성화 시 상품명/컬러 타이틀에 적용되는 대표 색상
      desc: "lychee sorbet & peach melba",
      image: BrightColor,
      accordionDetails: [
        {
          image: Bright_product1,
          title: "직관적인 청량감, 리치소르베",
          desc: "마시는 순간, 나른했던 오후를 단숨에 날려버리는 청량감. 리치와 샤인머스캣의 싱그러움이 입안에서 생기 있게 톡. 바로 느낄 수 있을걸?  온몸을 타고 흐르는 짜릿함.",
        },
        {
          image: Bright_product2,
          title: "역사적 서사를 담은 프리미엄 디저트, 피치멜바",
          desc: "단 한 명의 소프라노를 위해 만든 런던의 로맨틱한 디저트, 피치 멜바. 낭만을 가득 채운 복숭아와 라즈베리가 물들인 핑크빛 이야기에 퐁당.입안에서 펼쳐지는 새콤달콤한 멜로 드라마 한 편, 어때? ",
        },
      ],
    },
    {
      name: "DECAF EDITION",
      color: "#794a9a", // 활성화 시 상품명/컬러 타이틀에 적용되는 대표 색상
      desc: "pistachio ganache & apricot atelier",
      image: DecafColor,
      accordionDetails: [
        {
          image: Decaf_product1,
          title: "바쁜 하루 끝 가장 부드러운 한 잔, 피스타치오가나슈",
          desc: "한 스푼 더 뜨고 싶어지는 조용하지만 강한 달콤함. 흘러내리는 가나슈 초콜릿의 풍미와 피스타치오의 고소함이 입안 가득. 말없이 마음을 녹이는 깊고 부드러운 순간. ",
        },
        {
          image: Decaf_product2,
          title: "산뜻함 그 이상의 특별함, 애프리콧 아뜰리에",
          desc: "오후의 햇살처럼 하루의 기분을 밝히는 싱그러움.  홍차의 은은한 향기와 살구의 생기가 기분 좋게 살랑. 캔버스 위로 번지는 물감처럼, 오늘의 기분까지 선명하게 물들여봐. ",
        },
      ],
    },
  ];

  // 카드 클릭 시 토글 핸들러
  const handleProductClick = (index: number) => {
    // 같은 카드를 다시 누르면 닫힘, 아니면 해당 카드를 열림 상태로 전환
    const willOpen = activeProduct !== index;
    trackProductClick(products[index].name, index, willOpen);
    setActiveProduct(willOpen ? index : null);
  };

  // 제목 문자열을 콤마 기준으로 [검정 부분 / 컬러 부분]으로 분리
  // 예) "검증된 조합의 현대적 재해석, 오랑주 쇼콜라" → black: "검증된 조합의 현대적 재해석,", color: "오랑주 쇼콜라"
  // 콤마가 없으면 전체를 컬러 부분으로 처리 (예: "LYCHEE SORBET BREEZE")
  const splitTitle = (title: string) => {
    const idx = title.indexOf(",");
    if (idx === -1) return { black: "", color: title };
    return {
      black: title.slice(0, idx + 1),
      color: title.slice(idx + 1).trim(),
    };
  };

  // 문자열 내의 "<br />"(및 <br/>, <br>) 태그를 실제 줄바꿈으로 렌더링
  const renderMultiline = (text: string) =>
    text.split(/<br\s*\/?>/i).map((line, lineIdx, arr) => (
      <React.Fragment key={lineIdx}>
        {line.trim()}
        {lineIdx < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  // 한글 본문 공통 서식 (Web 기준 40px / 행간 60 / 자간 -0.025em, Pretendard는 font-sans 폴백으로 적용)
  const koreanTextClass =
    "text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-[30px] xl:leading-[50px] font-sans";

  // 아코디언 내부 공통 콘텐츠 (데스크탑/모바일 동일 구조 공유)
  // 구조: 상품명 → 상세 이미지(한 줄) → [검정 title + 컬러 title(한 줄)] → 설명글  (디테일 수만큼 반복)
  // isMobile: 모바일 인스턴스(lg 미만)에서만 상세 이미지 클릭 시 와디즈 스토어로 이동
  const renderAccordionContent = (
    product: (typeof products)[number],
    isMobile = false,
  ) => (
    <div className="flex flex-col w-full">
      {/* 상품명: 모바일 가운데 정렬 / Web 좌측 정렬, 색상은 활성 제품 대표 색상 */}
      <h3
        className="text-center lg:text-left font-semibold uppercase text-3xl sm:text-4xl lg:text-5xl xl:text-[55px] xl:leading-[65px] font-sans"
        style={{ letterSpacing: "-0.04em", color: product.color }}
      >
        {product.name}
      </h3>

      {/* 상세 상품 이미지: 모바일 가운데(두 개 나란히) / Web 좌측 정렬 */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-[820px] mx-auto lg:mx-0 w-full">
        {product.accordionDetails.map((feat, fIdx) => (
          <div
            key={fIdx}
            onClick={
              isMobile
                ? () => {
                    trackOutbound("shop_wadiz_productDetail", WADIZ_STORE_URL);
                    window.open(WADIZ_STORE_URL, "_blank");
                  }
                : undefined
            }
            className={`w-full aspect-square overflow-hidden rounded-sm ${
              isMobile ? "cursor-pointer" : ""
            }`}
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
      <div className="flex flex-col space-y-8 md:space-y-12 lg:space-y-[60px] mt-3 md:mt-4 lg:mt-[20px]">
        {product.accordionDetails.map((feat, fIdx) => {
          const { black, color } = splitTitle(feat.title);
          return (
            <div key={fIdx} className="w-full flex flex-col">
              {/* 검정 title + 컬러 title 을 한 줄에 표시 (컬러 부분은 활성 제품 대표 색상) */}
              <h4
                className={`font-semibold ${koreanTextClass}`}
                style={{ letterSpacing: "-0.025em" }}
                id={`accordion-feat-title-${fIdx}`}
              >
                {black && <span className="text-[#000000]">{black} </span>}
                <span style={{ color: product.color }}>{color}</span>
              </h4>
              {/* 하단 설명글 (<br /> 태그를 실제 줄바꿈으로 렌더링) */}
              <p
                className={`text-[#000000]/85 font-normal mt-2 xl:mt-4 ${koreanTextClass}`}
                style={{ letterSpacing: "-0.025em" }}
                id={`accordion-feat-desc-${fIdx}`}
              >
                {renderMultiline(feat.desc)}
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
      className="bg-[#fae6aa] 
      pt-8 md:pt-16 lg:pt-[100px] w-full
      pb-8 md:pb-16 lg:pb-[100px]"
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
                    {/* 상품명 텍스트 */}
                    <h3
                      className="font-normal text-[#000000] text-sm sm:text-lg lg:text-xl xl:text-[25px] xl:leading-[35px] uppercase font-sans"
                      style={{ letterSpacing: "-0.04em" }}
                      id={`product-title-${index}`}
                    >
                      {item.name}
                    </h3>
                    {/* 설명글 텍스트 */}
                    <p
                      className="text-[#000000]/85 font-normal text-sm sm:text-lg lg:text-xl xl:text-[25px] xl:leading-[35px] font-sans"
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
                  {renderAccordionContent(item, true)}
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
          {activeProduct !== null && (
            // STORIES 섹션과 동일하게 좌측 약 25% 여백 + 우측(나머지 75%) 영역 안에서만 콘텐츠 표시
            <div
              className="flex flex-row gap-[8%] w-full"
              id="product-detail-accordion-layout"
            >
              {/* 좌측 여백 컬럼 (콘텐츠 없음) */}
              <div
                className="w-[25%] max-w-[445px] flex-shrink-0"
                aria-hidden="true"
              />
              {/* 우측 콘텐츠 영역 */}
              <div
                className="flex-1 w-full"
                id="product-detail-accordion-content"
              >
                {renderAccordionContent(products[activeProduct])}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
