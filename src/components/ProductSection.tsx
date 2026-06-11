import React, { useState } from "react";

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
      image: "https://placehold.co/442x442/D9D9D9/1a1a1a?text=DEEP+EDITION",
      accordionDetails: [
        {
          image: "https://placehold.co/400x400/D9D9D9/1a1a1a?text=DEEP+FEAT+1",
          title: "DEEP ORANGE CHOCOLAT",
          desc: "오렌지 쇼콜라의 싱그러우면서도 달콤쌉싸름한 산미가 온 세상을 상쾌하게 물들입니다. 커피 한 잔에 깃든 생생한 플레저를 경험해보세요."
        },
        {
          image: "https://placehold.co/400x400/BFBFBF/1a1a1a?text=DEEP+FEAT+2",
          title: "CREAMY NUT BALANCE",
          desc: "크리미 넛츠의 묵직하고 고소한 바디감이 입안 전체를 벨벳처럼 부드럽게 감싸 안으며, 잊지 못할 여운과 맛의 깊이를 선사합니다."
        }
      ]
    },
    {
      name: "BRIGHT EDITION",
      desc: "lychee sorbet & peach melba",
      image: "https://placehold.co/442x442/BFBFBF/1a1a1a?text=BRIGHT+EDITION",
      accordionDetails: [
        {
          image: "https://placehold.co/400x400/BFBFBF/1a1a1a?text=BRIGHT+FEAT+1",
          title: "LYCHEE SORBET BREEZE",
          desc: "리치 소르베의 싱그럽고 톡톡 튀는 청량감이 가득 스며들어, 피로를 단번에 날려주는 지고의 자유로움을 선물합니다."
        },
        {
          image: "https://placehold.co/400x400/A6A6A6/1a1a1a?text=BRIGHT+FEAT+2",
          title: "PEACH MELBA FRUITY",
          desc: "달콤하고 부드러운 피치 멜바 향이 입안을 프랑스 마르세유 테라스처럼 고급스럽고 아름다운 아로마로 장식합니다."
        }
      ]
    },
    {
      name: "DECAF EDITION",
      desc: "pistachio ganache & apricot atelier",
      image: "https://placehold.co/442x442/A6A6A6/1a1a1a?text=DECAF+EDITION",
      accordionDetails: [
        {
          image: "https://placehold.co/400x400/A6A6A6/1a1a1a?text=DECAF+FEAT+1",
          title: "PISTACHIO GANACHE",
          desc: "피스타치오 가나슈의 벨벳같이 감미로운 터치와 고소함이 돋보이며, 지친 일상에 풍요로운 쉼표가 되어 줍니다."
        },
        {
          image: "https://placehold.co/400x400/D9D9D9/1a1a1a?text=DECAF+FEAT+2",
          title: "APRICOT ATELIER",
          desc: "향긋하고 섬세한 살구 아틀리에의 조화로운 무드가 은은하게 이어지며 깊은 밤, 완벽하게 디카페인으로 안심하고 취하는 특별한 여유를 제공합니다."
        }
      ]
    }
  ];

  // 카드 클릭 시 토글 핸들러
  const handleProductClick = (index: number) => {
    if (activeProduct === index) {
      setActiveProduct(null);
    } else {
      setActiveProduct(index);
    }
  };

  return (
    <section
      ref={productRef}
      // 상하 내부 여백 100 (xl:py-[100px])
      className="bg-[#F5E6A3] py-10 md:py-16 lg:py-24 xl:py-[100px] w-full"
      id="product-section"
    >
      {/* 좌우 내부 여백 100 (xl:px-[100px]) */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full max-w-[1980px] mx-auto" id="product-inner-container">
        
        {/* 제품(3개 - 동일간격 배치) */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-[6%]"
          id="product-cards-grid"
        >
          {products.map((item, index) => {
            const isSelected = activeProduct === index;
            return (
              <div key={index} className="flex flex-col w-full xl:max-w-[442px] mx-auto" id={`product-card-wrapper-${index}`}>
                <div
                  onClick={() => handleProductClick(index)}
                  // 카드 내의 여백 제거 (p-0), 백그라운드 컬러 삭제, border 삭제, shadow 삭제
                  className="flex flex-col cursor-pointer bg-transparent p-0 border-0 shadow-none transition-all duration-300 relative select-none w-full"
                  id={`product-card-${index}`}
                >
                  {/* 이미지 크기: 가변적 비율 유지하며 최대 442*442 */}
                  <div 
                    className="w-full aspect-square overflow-hidden rounded-sm bg-black/5 relative"
                    id={`product-image-container-${index}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                      loading="lazy"
                      id={`product-img-${index}`}
                    />
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="mt-4 md:mt-6 xl:mt-[30px] flex flex-col space-y-1 md:space-y-2" id={`product-info-text-${index}`}>
                    {/* 상품명 텍스트: 사이즈 30, regular, 자간 -40 */}
                    <h3
                      className="font-normal text-[#1A1A1A] text-xl sm:text-2xl lg:text-[28px] xl:text-[30px] xl:leading-[40px] uppercase font-sans"
                      style={{ letterSpacing: "-0.04em" }}
                      id={`product-title-${index}`}
                    >
                      {item.name}
                    </h3>
                    {/* 설명글 텍스트: 사이즈 25, regular, 자간 -40 */}
                    <p
                      className="text-[#1A1A1A]/85 font-normal text-base sm:text-lg lg:text-xl xl:text-[25px] xl:leading-[35px] font-sans"
                      style={{ letterSpacing: "-0.04em" }}
                      id={`product-desc-${index}`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* 보기 편한 인터랙션 표시 */}
                  <div className="mt-2 flex justify-start pb-2" id={`product-badge-row-${index}`}>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                        isSelected ? "text-[#4A90D9]" : "text-[#E8610A] hover:text-[#E8610A]/80"
                      }`}
                      id={`product-indicator-${index}`}
                    >
                      {isSelected ? "CLOSE ▲" : "DETAIL ▼"}
                    </span>
                  </div>
                </div>

                {/* 모바일 뷰 전용 아코디언 (Mobile View 전용: md 미만에서만 표출) */}
                <div
                  className={`md:hidden overflow-hidden transition-all duration-700 ease-in-out ${
                    isSelected
                      ? "max-h-[1500px] opacity-100 mt-4 mb-8"
                      : "max-h-0 opacity-0 mt-0 mb-0"
                  }`}
                  id={`product-mobile-accordion-${index}`}
                >
                  <div className="flex flex-col space-y-8 w-full" id={`mobile-accordion-items-${index}`}>
                    {item.accordionDetails.map((feat, fIdx) => (
                      <div 
                        key={fIdx}
                        className="flex flex-col items-start w-full gap-4"
                        id={`mobile-accordion-row-${index}-${fIdx}`}
                      >
                        {/* 이미지 크기 400x400 최적화 */}
                        <div className="w-full max-w-[400px] aspect-square overflow-hidden rounded-sm bg-black/5">
                          <img
                            src={feat.image}
                            alt={feat.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* 우측 위의 상품명 텍스트와 설명글 텍스트가 동일하게 표시 (자간 -40) */}
                        <div className="w-full flex flex-col justify-start">
                          <h4 
                            className="text-[#1A1A1A] font-normal text-xl sm:text-2xl uppercase font-sans"
                            style={{ letterSpacing: "-0.04em" }}
                          >
                            {feat.title}
                          </h4>
                          <p 
                            className="text-[#1A1A1A]/85 font-normal text-base sm:text-lg mt-2 font-sans"
                            style={{ letterSpacing: "-0.04em" }}
                          >
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 제품설명 아코디언 (Desktop View 전용) */}
        {/* 백그라운드 컬러 삭제, border 삭제, xl:mt-[100px] 간격 유지 */}
        <div
          className={`hidden md:block overflow-hidden transition-all duration-700 ease-in-out ${
            activeProduct !== null
              ? "max-h-[3000px] opacity-100 mt-10 md:mt-16 xl:mt-[100px]"
              : "max-h-0 opacity-0 mt-0"
          }`}
          id="product-detail-accordion"
        >
          {activeProduct !== null && (
            <div className="flex flex-col space-y-10 md:space-y-16 xl:space-y-[100px] w-full" id="accordion-items-container">
              {products[activeProduct].accordionDetails.map((feat, fIdx) => (
                <div 
                  key={fIdx}
                  // 좌측 가변적 비율 + 사이 8% 간격 + 우측 나머지 구조
                  className="flex flex-col xl:flex-row xl:gap-[8%] items-start w-full"
                  id={`accordion-row-${fIdx}`}
                >
                  {/* 좌측 이미지 블록 */}
                  <div 
                    className="w-full xl:w-[25%] xl:max-w-[445px] xl:flex-shrink-0 flex justify-start items-start"
                    id={`accordion-left-${fIdx}`}
                  >
                    <div 
                      className="w-full max-w-[400px] aspect-square overflow-hidden rounded-sm bg-black/5"
                      id={`accordion-img-box-${fIdx}`}
                    >
                      <img
                        src={feat.image}
                        alt={feat.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* 우측 위의 상품명 텍스트와 설명글 텍스트가 동일하게 표시 (사이즈 30 / 25, regular, 자간 -40) */}
                  <div 
                    className="flex-1 w-full flex flex-col justify-start pt-4 xl:pt-0"
                    id={`accordion-right-${fIdx}`}
                  >
                    {/* 상품명 텍스트: 사이즈 30, regular, 자간 -40 */}
                    <h4 
                      className="text-[#1A1A1A] font-normal text-xl sm:text-2xl lg:text-[28px] xl:text-[30px] xl:leading-[40px] uppercase font-sans"
                      style={{ letterSpacing: "-0.04em" }}
                      id={`accordion-feat-title-${fIdx}`}
                    >
                      {feat.title}
                    </h4>
                    {/* 설명글 텍스트: 사이즈 25, regular, 자간 -40 */}
                    <p 
                      className="text-[#1A1A1A]/85 font-normal text-base sm:text-lg lg:text-xl xl:text-[25px] xl:leading-[35px] mt-2 xl:mt-4 font-sans"
                      style={{ letterSpacing: "-0.04em" }}
                      id={`accordion-feat-desc-${fIdx}`}
                    >
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
