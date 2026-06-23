export default function Footer() {
  return (
    <footer
      // 푸터 구조 설명:
      // 브랜드 아이덴티티에 걸맞는 아주 어두운 차콜 그레이 성조의 색상(#1A1A1A)을 전폭 적용하였으며,
      // 상하 py-5 패딩을 입혀 극도로 정돈되고 미니멀리즘적인 싱글 라인 포맷을 실현했습니다.
      className="bg-[#1A1A1A] py-6 md:py-8 lg:py-9 xl:py-[40px] px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[100px] w-full border-t border-black/20 select-none"
      id="brand-footer"
    >
      <div className="w-full max-w-[1980px] mx-auto flex items-center justify-center" id="footer-content-container">
        {/* regular, 자간 -40, xl사이즈 25px에 최적화된 텍스트 */}
        <p
          className="text-white/85 text-xs sm:text-base md:text-lg lg:text-xl xl:text-[25px] xl:leading-[35px] font-sans uppercase font-normal text-center"
          style={{ letterSpacing: "-0.04em" }}
          id="footer-text-line"
        >
          EQUALTABLE INC. BUSINESS NUMBER : 564-87-02196 | ADDRESS : B1209, 40-36, Sinnaeyeok-ro 3-gil, Jungnang-gu, Seoul | info.equaltable@gmail.com | ©NEWED.ALL RICHTSRESERVED
        </p>
      </div>
    </footer>
  );
}
