// Newed 브랜드의 코어 슬로건 및 철학을 보여주는 단일 대용량 텍스트 섹션입니다.
export default function BrandStatement() {
  return (
    <section 
      // 레이아웃 구조 설명:
      // 깔끔하고 신뢰감을 주는 순백색(#fafaf8) 배경을 채택하고 상하 여백(패딩)을 두었으며,
      // 내부 컨텐츠는 반응형 정렬 컨테이너를 사용해 화면 해상도별로 좌우 100px 가량의 일체감 있는 마진을 유지합니다.
      // 상하 내부 여백 150 (xl:py-[150px])
      className="bg-[#fafaf8] py-8 md:py-16 lg:py-24 xl:py-25 flex items-center w-full"
      id="brand-statement-section"
    >
      {/* 좌우 내부 여백 100 (xl:px-[100px]) */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full max-w-[1980px] mx-auto" id="brand-statement-text-container">
        {/* 아주 크고 시선을 끄는 Mohave 볼드/세미볼드 폰트 타이포그래피 활용 */}
        {/* 크기 130, 행간 140, 자간 -40 (-0.04em), semi bold 적용 */}
        <p
          className="font-semibold text-[#000000] 
          text-2xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-[80px] 2xl:text-[100px] 
          leading-[30px] sm:leading-[50px] md:leading-[50px] lg:leading-[80px]  xl:leading-[100px] font-sans"
          style={{ letterSpacing: "-0.04em" }}
          id="brand-statement-paragraph"
        >
          Forget the theories and simply taste, 
          following the moment as you meet
          the vivid pleasure of NEWED
        </p>
      </div>
    </section>
  );
}

