import React, { useState } from "react";

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
      className="bg-[#fafaf8] py-10 md:py-16 lg:py-24 xl:py-[100px] border-b border-[#ebd787]/35 w-full"
      id="stories-section"
    >
      {/* 좌우 내부 여백 100 (xl:px-[100px]) */}
      <div
        className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full max-w-[1980px] mx-auto animate-fade-in"
        id="stories-inner-container"
      >
        {/* 좌측 약 25% + 사이 약 8% 간격 + 나머지 우측 레이아웃 */}
        <div 
          className="flex flex-col xl:flex-row xl:gap-[8%] xl:items-start w-full"
          id="stories-layout-container"
        >
          {/* 좌측 텍스트: 모바일에선 전체 너비, 데스크탑에선 약 25% 가변 너비 부여하되 최대 445px 확보 */}
          <div 
            className="w-full xl:w-[25%] xl:max-w-[445px] xl:flex-shrink-0 select-none pb-4 xl:pb-0" 
            id="stories-title-col"
          >
            <h2
              className="font-semibold text-[#1A1A1A] uppercase text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[100px] xl:leading-[120px] font-sans"
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
              className="text-[#1A1A1A] font-normal text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[55px] xl:leading-[80px] font-sans"
              style={{ letterSpacing: "-0.04em" }}
              id="stories-description-text"
            >
              Marseille–where France's first coffeehouse opened. New things came in like waves. 
              People simply enjoyed the thrill. NEWED brings that freedom here.
            </p>

            {/* MORE 텍스트: 사이즈 55, 행간 80, 자간 -40 (-0.04em), regular */}
            <div className="flex justify-end mt-4 md:mt-6 xl:mt-[40px]" id="stories-button-row">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group text-[#E8610A] hover:text-[#c95308] font-normal text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[55px] xl:leading-[80px] uppercase flex items-center gap-2 focus:outline-none cursor-pointer transition-colors font-sans"
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
              {/* MORE 내의 텍스트 스타일: 위의 "우측 설명 글" 스타일과 동일 */}
              <div 
                className="text-[#1a1a1a] font-normal text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[55px] xl:leading-[80px] space-y-6 md:space-y-8 xl:space-y-[40px] font-sans" 
                style={{ letterSpacing: "-0.04em" }}
                id="stories-accordion-inner"
              >
                <p className="font-semibold">
                  마르세유에서 시작된 자유, NEWED 브랜드의 비하인드 스토리
                </p>
                <p>
                  1671년, 프랑스 마르세유에서 프랑스 최초의 카페가 문을 열었습니다. 
                  전 세계에서 파도를 타고 흘러들어온 원두와 사람 그리고 생각들이 한 공간에 뒤섞이며 
                  새롭고 감각적인 활기와 유희가 창조되었습니다. 복잡한 맛의 분석이나 이론적이고 고리타분한 학설에 지치셨나요?
                </p>
                <p>
                  뉴에드는 마르세유의 카페를 채웠던 자유분방함과 기쁨의 본질로 돌아갑니다. 
                  단 한 모금만으로도 머리가 가벼워지고 깊고 청명한 풍미가 입안 전체를 감쌉니다.
                  맛을 감별하려고 복잡하게 생각하는 대신, 이 순간 마주한 순수한 일상의 즐거움과 일탈을 느껴보세요. 
                  생생하게 번지는 커피의 활기찬 매력, 그것이 바로 당신과 나를 깨우는 NEWED입니다.
                </p>
                <p className="font-bold text-[#E8610A] uppercase tracking-wider text-xs xl:text-sm pt-2">
                  @@ NEWED Marseille Heritage Journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
