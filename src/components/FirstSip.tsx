import { useState, useEffect } from "react";

export default function FirstSip() {
  // 모바일과 웹 해상도를 구분하기 위한 반응형 수치 감지 state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280); // xl 기준 (1280px)
    };
    handleResize(); // 컴포넌트 마운트 즉시 판정 수행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="w-full bg-[#4A90D9] overflow-hidden"
      id="first-sip-section"
    >
      {/* 1980px를 최대 너비로 상정하고 좌측 내부 여백 100 (xl:pl-[100px], pr-0). 모바일에서는 이미지가 화면 끝까지 차도록 좌측 여백을 자식 요소에 개별 할당 */}
      <div 
        className="xl:pl-[100px] pr-0 w-full max-w-[1980px] mx-auto" 
        id="first-sip-inner-container"
      >
        <div
          // xl 해상도에서 445px(좌측) + 사이 100px 간격 + 나머지 구역(우측) 으로 정렬
          className="flex flex-col xl:flex-row xl:gap-[100px] w-full items-stretch bg-[#4A90D9] xl:h-[800px]"
          id="first-sip-layout"
        >
          {/* 좌측 영역: 445px 폭 고정, 상단 내부 여백 100px, 텍스트 상단 고정. 모바일 정렬용 px-4 sm:px-8 md:px-16 추가 */}
          <div
            className="w-full xl:w-[445px] xl:flex-shrink-0 flex flex-col justify-start px-4 sm:px-8 md:px-16 xl:px-0 pt-10 pb-6 md:pt-16 md:pb-10 xl:pt-[100px] xl:pb-0 font-sans select-none"
            id="first-sip-text-block"
          >
            {/* 텍스트 사이즈 100, 행간 120, 자간 -40 (즉 -4% or -0.04em), semi bold */}
            <h2
              className="font-semibold text-white uppercase text-4xl sm:text-5xl md:text-6xl xl:text-[100px] xl:leading-[120px] tracking-tight"
              style={{ letterSpacing: "-0.04em" }}
              id="first-sip-heading"
            >
              <span className="block">FIRST SIP</span>
              <span className="block">THAT</span>
              <span className="block">FEELING</span>
            </h2>
          </div>

          {/* 우측 영역: 나머지 공간 전체 이미지. 모바일 및 태블릿에서는 aspect ratio와 absolute를 활용해 여백 없이 완벽 피트시킴 */}
          <div
            className="flex-1 w-full overflow-hidden relative aspect-[4/3] md:aspect-[16/10] xl:aspect-auto xl:min-h-0"
            id="first-sip-image-block"
          >
            <img
              src={isMobile ? "https://placehold.co/800x600/D9D9D9/ffffff?text=Blue+Swirl+Feeling" : "https://placehold.co/1335x800/D9D9D9/ffffff?text=Blue+Swirl+Feeling"}
              alt="First sip feeling - blue creamy swirl"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-102"
              loading="lazy"
              id="first-sip-dynamic-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
