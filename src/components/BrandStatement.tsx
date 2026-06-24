// Newed 브랜드의 코어 슬로건 및 철학을 보여주는 단일 대용량 텍스트 섹션입니다.
export default function BrandStatement() {
  return (
    <section 
      // 레이아웃 구조 설명:
      // 깔끔하고 신뢰감을 주는 순백색(#fafaf8) 배경을 채택하고 상하 여백(패딩)을 두었으며,
      // 내부 컨텐츠는 반응형 정렬 컨테이너를 사용해 화면 해상도별로 좌우 100px 가량의 일체감 있는 마진을 유지합니다.
      // 상하 내부 여백 150 (xl:py-[150px])
      className="bg-[#fafaf8] py-10 md:py-16 lg:py-28 xl:py-[150px] flex items-center w-full"
      id="brand-statement-section"
    >
      {/* 좌우 내부 여백 100 (xl:px-[100px]) */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full max-w-[1980px] mx-auto" id="brand-statement-text-container">
        {/* 아주 크고 시선을 끄는 Mohave 볼드/세미볼드 폰트 타이포그래피 활용 */}
        {/* 크기 130, 행간 140, 자간 -40 (-0.04em), semi bold 적용 */}
        <p
          className="font-semibold text-[#000000] text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-[100px] xl:leading-[110px] font-sans"
          style={{ letterSpacing: "-0.04em" }}
          id="brand-statement-paragraph"
        >
          Forget the theories and simply taste, <br />
          following the moment as you meet <br />
          the vivid pleasure of NEWED
        </p>
      </div>
    </section>
  );
}

