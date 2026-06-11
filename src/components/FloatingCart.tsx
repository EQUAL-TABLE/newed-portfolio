import { ShoppingBag } from "lucide-react";

export default function FloatingCart() {
  // 장바구니 클릭 시 지정된 인스타그램 오피셜 계정 링크로 새 창 이동 처리하는 핸들러 함수
  const handleCartClick = () => {
    window.open("https://www.instagram.com/newed_official/", "_blank");
  };

  return (
    <button
      onClick={handleCartClick}
      // fixed 속성 정의 사유: 화면 스크롤 진행 상황과 관계없이 항상 좌측 하단에 고정 표시되어 유저가 쇼핑몰 바로가기나 채널에 직관적으로 접근할 수 있도록 하기 위함입니다.
      className="fixed bottom-6 left-6 z-50 bg-[#E8610A] hover:bg-[#c95308] hover:scale-105 active:scale-95 text-white p-3.5 rounded-lg shadow-xl cursor-pointer transition-all duration-300 flex items-center justify-center group"
      aria-label="Newed Shop / Instagram"
      id="floating-cart-button"
    >
      {/* 바스켓 아이콘 노출 */}
      <ShoppingBag size={24} className="transition-transform duration-300 group-hover:rotate-6" />
    </button>
  );
}
