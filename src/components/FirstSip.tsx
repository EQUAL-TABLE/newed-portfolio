import skyblueIcecream from "../assets/images/skyblue_icecream.webp";

export default function FirstSip() {
  return (
    <section
      className="w-full bg-[#468fcd] overflow-hidden"
      id="first-sip-section"
    >
      {/* 1980px를 최대 너비로 상정하고 좌측 내부 여백 100 (xl:pl-[100px], pr-0). 모바일에서는 이미지가 화면 끝까지 차도록 좌측 여백을 자식 요소에 개별 할당 */}
      <div
        className="lg:pl-12 xl:pl-[100px] pr-0 w-full max-w-[1980px] mx-auto"
        id="first-sip-inner-container"
      >
        <div
          // lg(1024px) 이상에서 약 25% 가량(좌측) + 사이 약 8% 간격 + 나머지 구역(우측) 으로 정렬, 미만에서는 세로 쌓기
          className="flex flex-col lg:flex-row lg:gap-[8%] w-full items-stretch bg-[#468fcd] lg:min-h-[640px] xl:min-h-[800px]"
          id="first-sip-layout"
        >
          {/* 좌측 영역: 모바일 및 태블릿에서는 전폭, lg 이상 데스크탑에서는 가변적이되 최대 445px 제한 */}
          <div
            className="w-full lg:w-[25%] lg:max-w-[445px] lg:flex-shrink-0 flex flex-col justify-start pt-10 md:pt-16 lg:pt-24 xl:pt-[100px] font-sans select-none"
            id="first-sip-text-block"
          >
            {/* 텍스트 사이즈 100, 행간 120, 자간 -40 (즉 -4% or -0.04em), semi bold */}
            <h2
              className="font-semibold text-[#fafaf8] uppercase text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-[70px] xl:leading-[80px] tracking-tight"
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
            className="flex-1 w-full overflow-hidden relative aspect-[4/3] md:aspect-[16/10] lg:aspect-auto lg:min-h-0"
            id="first-sip-image-block"
          >
            {/* 이미지 아트디렉션: lg(1024px) 이상에서 고해상 데스크탑 이미지, 미만에서는 모바일 이미지로 CSS-only 스왑 */}
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={skyblueIcecream}
              />
              {/* object-[center_ %]: 화면에 표시할 y 위치 조정  */}
              <img
                src={skyblueIcecream}
                alt="First sip feeling - sky blue ice cream"
                className="absolute inset-0 w-full h-full object-cover object-[center_82%] transition-transform duration-700 hover:scale-102"
                loading="lazy"
                id="first-sip-dynamic-image"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
