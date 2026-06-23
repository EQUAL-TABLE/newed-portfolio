import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import bite from "../assets/images/bite.png";
import slideImg1 from "../assets/images/slideImg1.jpg";
import slideImg2 from "../assets/images/slideImg2.jpg";
import slideImg3 from "../assets/images/slideImg3.jpg";
import slideImg4 from "../assets/images/slideImg4.jpg";
import slideImg5 from "../assets/images/slideImg5.jpg";
import slideImg6 from "../assets/images/slideImg6.jpg";

// Props 인터페이스 정의
interface HeroSliderProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroSlider({ heroRef }: HeroSliderProps) {
  // 현재 활성화된 슬라이드 인덱스를 관리하는 state (0, 1, 2)
  const [activeSlide, setActiveSlide] = useState(0);

  // activeSlide에 따른 메인 슬라이드 이미지 매핑
  const mainImages = [
    slideImg1,
    slideImg2,
    slideImg3,
    slideImg4,
    slideImg5,
    slideImg6,
  ];

  // 슬라이드 변경을 트리거하는 핸들러 함수
  const handleThumbClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div
      ref={heroRef}
      className="w-full bg-[#ec7123] md:pt-[104px] lg:pt-[140px] xl:pt-[180px]" // 네비바 고정 높이에 따른 오프셋 확보 & 전반적인 오렌지 배경 역할
      id="hero-slider-section"
    >
      {/* 반응형 여백을 담당하며 가운데 정렬되는 감싸는 프레임. 상하 안쪽 여백 100, 좌우 안쪽 여백 100 */}
      <div
        className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] py-10 md:py-16 lg:py-24 xl:py-[100px] w-full max-w-[1980px] mx-auto"
        id="hero-slider-inner-container"
      >
        {/* 안쪽 컨텐츠 프레임: 좌측 이미지와 우측 슬라이더 사이 간격 50 (xl:gap-[50px]) */}
        <div
          className="flex flex-col lg:flex-row lg:items-stretch lg:gap-8 xl:gap-[50px] w-full"
          id="hero-slider-layout"
        >
          {/* 왼쪽 영역: 단독 세로 포트레이트 이미지 배정, 최대 800 * 800 */}
          <div
            className="w-full aspect-square lg:w-[45%] lg:max-w-[800px] lg:flex-shrink-0 relative overflow-hidden rounded-sm"
            id="hero-left-col"
          >
            {/* 세로 포트레이트 이미지를 지연 로딩(lazy)하여 적용 */}
            <img
              src={bite}
              alt="Newed Feeling"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-102"
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
            {/* 메인 슬라이드 이미지 - 930 * 580 */}
            <div
              className="w-full aspect-[930/580] lg:max-w-[930px] bg-black/5 relative overflow-hidden rounded-sm cursor-pointer lg:flex-shrink-0"
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
              className="flex flex-col flex-1 justify-between mt-4 md:mt-6 lg:mt-6 xl:mt-[30px]"
              id="hero-right-bottom-part"
            >
              {/* Spacer 1 (lg에서 전폭 50/50 비중으로 공간을 정가운데 분할, 압착 시 최소 16px 마진 보존) */}
              <div
                className="hidden lg:block flex-1 min-h-[16px] xl:min-h-[25px]"
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
                        className={`h-[20px] flex-1 transition-all duration-300 relative rounded-sm cursor-pointer focus:outline-none ${
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

              {/* Spacer 2 (lg에서 전폭 50/50 비중으로 공간을 정가운데 분할, 압착 시 최소 16px 마진 보존) */}
              <div
                className="hidden lg:block flex-1 min-h-[16px] xl:min-h-[25px]"
                id="hero-spacer-2"
              />

              {/* 우측 정렬 텍스트 슬레이트 - 설명 텍스트 하단 라인이 좌측 이미지 하단과 완벽 일치 */}
              {/* 크기 70px, 자간 -3.5px(또는 -0.05em), 행간 80px, Bold 적용 */}
              <div
                className="text-right py-2 md:py-4 xl:py-0 self-end w-full mt-4 lg:mt-6 xl:mt-0"
                id="hero-slider-caption-block"
              >
                <div className="font-bold text-white text-right font-sans uppercase text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-[70px] xl:leading-[80px] xl:tracking-[-3.5px] w-full">
                  ONE CUP, SUDDENLY LIGHTER <br /> THAT'S NEWED
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
