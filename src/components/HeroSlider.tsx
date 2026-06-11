import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// Props 인터페이스 정의
interface HeroSliderProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroSlider({ heroRef }: HeroSliderProps) {
  // 현재 활성화된 슬라이드 인덱스를 관리하는 state (0, 1, 2)
  const [activeSlide, setActiveSlide] = useState(0);

  // 모바일과 웹 브라우저 창 너비 규격을 감지하고 그에 맞는 이미지를 스왑하기 위한 state
  const [isMobile, setIsMobile] = useState(false);

  // 브라우저 뷰포트 크기가 768px 이상인지 실시간 감지하여 상태를 갱신하는 훅
  useEffect(() => {
    // 768px 미만인지 감지하는 미디어 쿼리 객체 생성
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    
    // 초기값 세팅
    setIsMobile(mediaQuery.matches);

    // 이벤트 리스너 함수 선언
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // 리스너 등록
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // 컴포넌트 언마운트 시 리스너 소멸
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // activeSlide에 따른 메인 슬라이드 이미지 매핑
  const mainImages = [
    "https://placehold.co/800x400/D9D9D9/ffffff?text=Slide+1",
    "https://placehold.co/800x400/BFBFBF/ffffff?text=Slide+2",
    "https://placehold.co/800x400/A6A6A6/ffffff?text=Slide+3",
    "https://placehold.co/800x400/A6A6A6/ffffff?text=Slide+4"
  ];

  // activeSlide에 따른 우측 하단 노출 캡션 텍스트 매핑
  const captions = [
    "ONE CUP, SUDDENLY LIGHTER / THAT'S NEWED",
    "SAMPLE2 HEADLINE / THAT'S NEWED",
    "SAMPLE3 HEADLINE / THAT'S NEWED",
    "SAMPLE4 HEADLINE / THAT'S NEWED"
  ];

  // 슬라이드 변경을 트리거하는 핸들러 함수
  const handleThumbClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div
      ref={heroRef}
      className="w-full bg-[#E8610A] pt-[72px] md:pt-[104px] xl:pt-[180px]" // 네비바 고정 높이에 따른 오프셋 확보 & 전반적인 오렌지 배경 역할
      id="hero-slider-section"
    >
      {/* 반응형 여백을 담당하며 가운데 정렬되는 감싸는 프레임. 상하 안쪽 여백 100, 좌우 안쪽 여백 100 */}
      <div 
        className="px-4 sm:px-8 md:px-16 xl:px-[100px] py-10 md:py-16 xl:py-[100px] w-full max-w-[1980px] mx-auto" 
        id="hero-slider-inner-container"
      >
        {/* 안쪽 컨텐츠 프레임: 좌측 이미지와 우측 슬라이더 사이 간격 50 (xl:gap-[50px]) */}
        <div
          className="flex flex-col md:grid md:grid-cols-10 md:gap-6 xl:flex xl:flex-row xl:gap-[50px] xl:items-start w-full"
          id="hero-slider-layout"
        >
          {/* 왼쪽 영역: 단독 세로 포트레이트 이미지 배정, 800 * 800 */}
          <div
            className="md:col-span-4 w-full aspect-square xl:w-[800px] xl:h-[800px] xl:flex-shrink-0 relative overflow-hidden rounded-sm"
            id="hero-left-col"
          >
            {/* 가변 중단점에 따라 서로 다른 크기의 이미지를 지연 로딩(lazy)하여 적용 */}
            <img
              src={isMobile ? "https://placehold.co/400x400?text=Popsicle+Feeling" : "https://placehold.co/400x400?text=Popsicle+Feeling"}
              alt="Newed Feeling"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-102"
              loading="lazy"
              id="hero-left-portrait-image"
            />
          </div>

          {/* 오른쪽 영역: 메인 슬라이드 + 썸네일 바 + 텍스트 */}
          {/* 전체 높이를 좌측 800px와 동일하게 맞춰 하단 정렬을 실현 */}
          <div
            className="md:col-span-6 w-full flex flex-col justify-between mt-6 md:mt-0 xl:mt-0 xl:w-[930px] xl:h-[800px] xl:flex-shrink-0"
            id="hero-right-col"
          >
            {/* 메인 슬라이드 이미지 - 930 * 580 */}
            <div
              className="w-full aspect-[930/580] xl:w-[930px] xl:h-[580px] bg-black/5 relative overflow-hidden rounded-sm cursor-pointer lg:flex-shrink-0"
              id="hero-right-main-image-container"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={mainImages[activeSlide]}
                  alt={`Main Slide ${activeSlide + 1}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  id={`hero-slide-image-${activeSlide}`}
                />
              </AnimatePresence>
            </div>

            {/* 슬라이더 이미지와 슬라이더 바 사이 간격을 조절하는 하단 파트 */}
            <div 
              className="flex flex-col flex-1 justify-between mt-4 md:mt-6 xl:mt-0" 
              id="hero-right-bottom-part"
            >
              {/* Spacer 1 (xl에서 전폭 50/50 비중으로 공간을 정가운데 분할) */}
              <div className="hidden xl:block flex-1" id="hero-spacer-1" />

              {/* 썸네일 슬라이더 바 (한 줄에 표시, 세로 20, 간격 나누기용 30*20 바 사이사이 추가) */}
              <div className="flex items-center w-full" id="hero-slider-thumbnails-container">
                <div className="flex items-center w-full" id="thumbnail-buttons-row">
                  {[0, 1, 2, 3].map((idx) => {
                    const isSelected = activeSlide === idx;
                    const sliderBar = (
                      <button
                        key={`bar-${idx}`}
                        onClick={() => handleThumbClick(idx)}
                        className={`h-[20px] flex-1 transition-all duration-300 relative rounded-sm cursor-pointer focus:outline-none ${
                          isSelected ? "bg-[#4A90D9]" : "bg-[#F5E6A3] hover:bg-[#F5E6A3]/80"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                        id={`thumbnail-btn-${idx}`}
                      />
                    );

                    if (idx < 3) {
                      return (
                        <React.Fragment key={`group-${idx}`}>
                          {sliderBar}
                          <div
                            className="w-[30px] h-[20px] bg-[#FFFBF0]/30 rounded-sm flex-shrink-0 mx-2 xl:mx-[12px]"
                            id={`thumbnail-sep-${idx}`}
                          />
                        </React.Fragment>
                      );
                    }

                    return sliderBar;
                  })}
                </div>
              </div>

              {/* Spacer 2 (xl에서 전폭 50/50 비중으로 공간을 정가운데 분할) */}
              <div className="hidden xl:block flex-1" id="hero-spacer-2" />

              {/* 우측 정렬 텍스트 슬레이트 - 설명 텍스트 하단 라인이 좌측 이미지 하단과 완벽 일치 */}
              {/* 크기 70px, 자간 -3.5px(또는 -0.05em), 행간 80px, Bold 적용 */}
              <div className="text-right py-2 md:py-4 xl:py-0 self-end w-full" id="hero-slider-caption-block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="font-bold text-white text-right font-sans uppercase text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-[70px] xl:leading-[80px] xl:tracking-[-3.5px] w-full"
                    id={`caption-text-${activeSlide}`}
                  >
                    {/* 줄바꿈을 포함하여 텍스트 분기 출력 */}
                    {captions[activeSlide].split(" / ").map((line, lineIdx) => (
                      <span key={lineIdx} className="block">
                        {line}
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
