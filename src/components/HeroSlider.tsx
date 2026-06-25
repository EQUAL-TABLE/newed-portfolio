import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { trackSliderThumb } from "../lib/analytics";
import bite from "../assets/images/bite.webp";
import slideImg1 from "../assets/images/slideImg1.webp";
import slideImg2 from "../assets/images/slideImg2.webp";
import slideImg3 from "../assets/images/slideImg3.webp";
import slideImg4 from "../assets/images/slideImg4.webp";
import slideImg5 from "../assets/images/slideImg5.webp";
import slideImg6 from "../assets/images/slideImg6.webp";

// Props 인터페이스 정의
interface HeroSliderProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroSlider({ heroRef }: HeroSliderProps) {
  // 현재 활성화된 슬라이드 인덱스를 관리하는 state (0, 1, 2)
  const [activeSlide, setActiveSlide] = useState(0);

  // activeSlide에 따른 메인 슬라이드 이미지 매핑
  // posY: 슬라이드별 세로 표시 기준점(%). 원본이 세로로 길어 930*600 영역에 잘릴 때,
  //       어느 세로 위치를 보여줄지 이미지마다 개별 지정 (0% = 상단, 50% = 중앙, 100% = 하단)
  const mainImages = [
    { src: slideImg1, posY: "42%" },
    { src: slideImg2, posY: "65%" },
    { src: slideImg3, posY: "53%" },
    { src: slideImg4, posY: "70%" },
    { src: slideImg5, posY: "60%" },
    { src: slideImg6, posY: "52%" },
  ];

  // 좌측 포트레이트(bite) 이미지의 세로 표시 기준점(%).
  // 모바일에서 영역이 3:2로 잘릴 때 어느 세로 위치를 보여줄지 지정 (0% = 상단, 50% = 중앙, 100% = 하단)
  const bitePosY = "70%";

  // 슬라이드 변경을 트리거하는 핸들러 함수
  const handleThumbClick = (index: number) => {
    trackSliderThumb(index);
    setActiveSlide(index);
  };

  // 2초마다 다음 슬라이드로 자동 전환.
  // activeSlide 의존성으로 인해 사용자가 드래그/썸네일로 직접 넘기면 타이머가 리셋됨
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % mainImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeSlide, mainImages.length]);

  // 좌우 드래그(스와이프)로 슬라이드 이동. 임계값(50px) 이상 이동 시 방향에 따라 전환
  const SWIPE_THRESHOLD = 50;
  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const offsetX = info.offset.x;
    if (offsetX <= -SWIPE_THRESHOLD) {
      // 왼쪽으로 드래그 → 다음 슬라이드
      const next = (activeSlide + 1) % mainImages.length;
      trackSliderThumb(next);
      setActiveSlide(next);
    } else if (offsetX >= SWIPE_THRESHOLD) {
      // 오른쪽으로 드래그 → 이전 슬라이드
      const prev = (activeSlide - 1 + mainImages.length) % mainImages.length;
      trackSliderThumb(prev);
      setActiveSlide(prev);
    }
  };

  return (
    <div
      ref={heroRef}
      className="w-full bg-[#ec7123] pt-23 sm:pt-23 md:pt-16 lg:pt-18 xl:pt-20" // 네비바 고정 높이에 따른 오프셋 확보 & 전반적인 오렌지 배경 역할
      id="hero-slider-section"
    >
      {/* 반응형 여백을 담당하며 가운데 정렬되는 감싸는 프레임. 상하 안쪽 여백 100, 좌우 안쪽 여백 100 */}
      <div
        className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] py-4 md:py-16 lg:py-24 xl:py-[100px] w-full max-w-[1980px] mx-auto"
        id="hero-slider-inner-container"
      >
        {/* 안쪽 컨텐츠 프레임: 좌측 이미지와 우측 슬라이더 사이 간격 50 (xl:gap-[50px]) */}
        <div
          className="flex flex-col lg:flex-row lg:items-stretch lg:gap-8 xl:gap-[50px] w-full"
          id="hero-slider-layout"
        >
          {/* 왼쪽 영역: 단독 세로 포트레이트 이미지 배정, 최대 800 * 800 */}
          <div
            className="w-full aspect-[4/3] lg:aspect-square lg:w-[45%] lg:max-w-[800px] lg:flex-shrink-0 relative overflow-hidden"
            id="hero-left-col"
          >
            {/* 세로 포트레이트 이미지를 지연 로딩(lazy)하여 적용 */}
            <img
              src={bite}
              alt="Newed Feeling"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-102"
              style={{ objectPosition: `center ${bitePosY}` }}
              loading="lazy"
              id="hero-left-portrait-image"
            />
          </div>

          {/* 오른쪽 영역: 메인 슬라이드 + 썸네일 바 + 텍스트 */}
          {/* 전체 높이를 좌측 800px와 동일하게 맞춰 하단 정렬을 실현 */}
          <div
            className="w-full flex flex-col justify-between mt-6 lg:mt-0 lg:flex-grow lg:flex-1 lg:max-w-[930px] lg:flex-shrink-0"
            id="hero-right-col"
          >
            {/* 메인 슬라이드 이미지 - 930 * 600 */}
            <div
              className="w-full aspect-[930/600] lg:max-w-[930px] bg-black/5 relative overflow-hidden cursor-pointer lg:flex-shrink-0
              "
              id="hero-right-main-image-container"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide}
                  src={mainImages[activeSlide].src}
                  alt={`Main Slide ${activeSlide + 1}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 5, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="w-full h-full object-cover touch-pan-y select-none"
                  style={{ objectPosition: `center ${mainImages[activeSlide].posY}` }}
                  loading="lazy"
                  draggable={false}
                  id={`hero-slide-image-${activeSlide}`}
                />
              </AnimatePresence>
            </div>

            {/* 슬라이더 이미지와 슬라이더 바 사이 간격을 조절하는 하단 파트 */}
            <div
              className="flex flex-col flex-1 justify-between"
              id="hero-right-bottom-part"
            >
              {/* Spacer 1 (lg에서 전폭 50/50 비중으로 공간을 정가운데 분할, 압착 시 최소 16px 마진 보존) */}
              <div
                className="h-2 md:h-4 lg:h-6 xl:h-8  flex-shrink-0"
                id="hero-spacer-1"
              />

              {/* 썸네일 슬라이더 바 (한 줄에 표시, 세로 20, 간격 나누기용 30*20 바 사이사이 추가) */}
              <div
                className="flex items-center w-full"
                id="hero-slider-thumbnails-container"
              >
                <div
                  className="flex items-center w-full"
                  id="thumbnail-buttons-row"
                >
                  {[0, 1, 2, 3, 4, 5].map((idx) => {
                    const isSelected = activeSlide === idx;
                    const sliderBar = (
                      <button
                        key={`bar-${idx}`}
                        onClick={() => handleThumbClick(idx)}
                        className={`h-1.25 md:h-2.5 flex-1 transition-all duration-300 relative cursor-pointer focus:outline-none ${
                          isSelected
                            ? "bg-[#468fcd]"
                            : "bg-[#fae6aa] hover:bg-[#fae6aa]/80"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                        id={`thumbnail-btn-${idx}`}
                      />
                    );

                    if (idx < 5) {
                      return (
                        <React.Fragment key={`group-${idx}`}>
                          {sliderBar}
                          <div
                            className="w-[20px] xl:w-[25px] h-[5px] md:h-2.5 bg-[#fafaf8]/30 flex-shrink-0 mx-2 xl:mx-[12px]"
                            id={`thumbnail-sep-${idx}`}
                          />
                        </React.Fragment>
                      );
                    }

                    return sliderBar;
                  })}
                </div>
              </div>

              {/* Spacer 2 (lg에서 전폭 50/50 비중으로 공간을 정가운데 분할, 압착 시 최소 16px 마진 보존) */}
              <div
                className="h-8 md:h-4 lg:h-6 xl:h-8 flex-shrink-0"
                id="hero-spacer-2"
              />

              {/* 우측 정렬 텍스트 슬레이트 - 설명 텍스트 하단 라인이 좌측 이미지 하단과 완벽 일치 */}
              {/* 크기 70px, 자간 -3.5px(또는 -0.05em), 행간 80px, Bold 적용 */}
              <div
                className="text-right self-end w-full"
                id="hero-slider-caption-block"
              >
                <div
                  className="font-bold text-[#fafaf8] text-right font-sans uppercase
                text-5xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-6xl
                xl:leading-[85px] w-full"
                  style={{ letterSpacing: "-0.05em" }}
                >
                  ONE CUP,{" "}
                  {/* 모바일: "ONE CUP," 뒤에서 줄바꿈(3줄) / 웹(lg+): 줄바꿈 없이 한 줄(2줄) */}
                  <br className="lg:hidden" />
                  SUDDENLY LIGHTER <br /> THAT'S NEWED
                </div>
              </div>

              {/* 모바일 뷰 전용 하단 여백 (lg 이상에서는 미적용) */}
              <div className="h-4 md:hidden flex-shrink-0" id="hero-mobile-bottom-spacer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
