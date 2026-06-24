import React, { useState } from "react";
import { trackAccordionToggle } from "../lib/analytics";
import sufferboard from "../assets/images/sufferboard.webp";
import stories_more from "../assets/images/stories_more.webp";

// Props 인터페이스 정의
interface StoriesProps {
  storiesRef: React.RefObject<HTMLDivElement | null>;
}

export default function Stories({ storiesRef }: StoriesProps) {
  // 아코디언 컴포넌트의 가시성 상태를 기록하는 boolean state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      ref={storiesRef} // 네비바 메뉴에서 스무스 스크롤 대상(storiesRef)으로 타겟팅을 잡기 위해 지정합니다.
      // 상하 내부 여백 100 (xl:py-[100px])
      className="bg-[#fafaf8] py-10 md:py-16 lg:py-24 xl:py-[100px] border-b border-[#fae6aa]/35 w-full"
      id="stories-section"
    >
      {/* 좌우 내부 여백 100 (xl:px-[100px]) */}
      <div
        className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full max-w-[1980px] mx-auto animate-fade-in"
        id="stories-inner-container"
      >
        {/* 좌측 약 25% + 사이 약 8% 간격 + 나머지 우측 레이아웃 */}
        <div
          className="flex flex-col lg:flex-row lg:gap-[8%] lg:items-start w-full"
          id="stories-layout-container"
        >
          {/* 좌측 텍스트: 모바일에선 전체 너비, lg 이상 데스크탑에선 약 25% 가변 너비 부여하되 최대 445px 확보 */}
          <div
            className="w-full lg:w-[25%] lg:max-w-[445px] lg:flex-shrink-0 select-none pb-4 lg:pb-0"
            id="stories-title-col"
          >
            <h2
              className="font-semibold text-[#000000] uppercase text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[70px] xl:leading-[120px] font-sans"
              style={{ letterSpacing: "-0.04em" }}
              id="stories-heading"
            >
              STORIES
            </h2>
          </div>

          {/* 우측 컴포넌트 전체 영역 */}
          <div
            className="flex-1 w-full flex flex-col"
            id="stories-description-col"
          >
            {/* 우측 설명 글: 사이즈 55, 행간 80, 자간 -40 (-0.04em), regular */}
            <p
              className="text-[#000000] font-normal text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[40px] xl:leading-[60px] font-sans"
              style={{ letterSpacing: "-0.04em" }}
              id="stories-description-text"
            >
              Marseille—where France’s first coffeehouse opened. <br />
              New things came in like waves. People simply enjoyed the thrill.
              <br />
              NEWED brings that freedom here.
            </p>

            {/* MORE 텍스트: 사이즈 55, 행간 80, 자간 -40 (-0.04em), regular */}
            <div
              className="flex justify-end mt-4 md:mt-6 xl:mt-[40px]"
              id="stories-button-row"
            >
              <button
                onClick={() => {
                  const next = !isOpen;
                  trackAccordionToggle("stories", next);
                  setIsOpen(next);
                }}
                className="group text-[#ec7123] hover:text-[#ec7123] font-normal text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[30px] xl:leading-[80px] uppercase flex items-center gap-2 focus:outline-none cursor-pointer transition-colors font-sans"
                style={{ letterSpacing: "-0.04em" }}
                id="stories-toggle-button"
              >
                <span>MORE</span>
                <span className="text-xl md:text-2xl lg:text-3xl xl:text-[40px] transition-transform duration-300">
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>
            </div>

            {/* MORE 아코디언: 백그라운드 컬러 삭제, border 삭제, 우측 설명 글 영역과 똑같은 width 내에서 글씨 표기 */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-[2500px] opacity-100 mt-6" : "max-h-0 opacity-0"
              }`}
              id="stories-accordion"
            >
              <div>
                <img
                  src={stories_more}
                  alt="stories_more"
                  className="w-full max-h-[550px] object-cover object-[center_20%]"
                  loading="lazy"
                />
              </div>
              {/* MORE 내의 텍스트 스타일: 위의 "우측 설명 글" 스타일과 동일 */}
              <div
                className="text-[#000000] font-normal text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[30px] xl:leading-[50px] space-y-6 md:space-y-8 font-sans mt-6 lg:mt-[100px] mb-10 md:mb-16 lg:mb-[100px]"
                style={{ letterSpacing: "-0.025em" }}
                id="stories-accordion-inner"
              >
                <p>
                  프랑스에 커피가 처음 닿은 도시, 마르세유 <br />
                  우리는 마르세유 커피하우스가 처음 깨운 선명한 감각과 그 새로움을 <br />
                  있는 그대로 즐기던 마르세유 사람들의 자유로운 직관에서 영감을 받았습니다. <br />
                  그 시절의 낭만을 현대적으로 재해석해 고객들에게 선명한 즐거움을 선사합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
