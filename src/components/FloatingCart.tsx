import { useState } from "react";
import { X } from "lucide-react";
import cart from "../assets/images/cart_new.png";
import { trackOutbound } from "../lib/analytics";

const WADIZ_STORE_URL =
  "https://www.wadiz.kr/web/wcomingsoon/rwd/399604?utm_source=wadizshare_in&utm_medium=share&sharer=1069001&walinkid=81502244";

export default function FloatingCart() {
  // 컴포넌트 노출 여부 상태 (웹·모바일 공통, X 버튼으로 끌 수 있음)
  const [isVisible, setIsVisible] = useState(true);

  // 장바구니 클릭 시 지정된 와디즈 스토어 링크로 새 창 이동 처리하는 핸들러 함수
  const handleCartClick = () => {
    trackOutbound("shop_wadiz", WADIZ_STORE_URL);
    window.open(WADIZ_STORE_URL, "_blank");
  };

  // X 버튼 클릭 시 컴포넌트를 화면에서 제거
  const handleClose = () => {
    setIsVisible(false);
  };

  // 닫힌 상태에서는 렌더링하지 않음
  if (!isVisible) return null;

  return (
    // fixed 속성 정의 사유: 화면 스크롤 진행 상황과 관계없이 항상 우측 하단에 고정 표시되어 유저가 쇼핑몰 바로가기나 채널에 직관적으로 접근할 수 있도록 하기 위함입니다.
    <div
      className="fixed bottom-6 right-6 z-50 group"
      id="floating-cart-container"
    >
      {/* 우측 상단 X 닫기 버튼 (웹·모바일 공통) */}
      <button
        onClick={handleClose}
        className="absolute -top-1 -right-1 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-[#000000]/60 text-[#fafaf8] hover:bg-[#000000]/80 active:scale-90 transition-all cursor-pointer shadow-md"
        aria-label="Close shop shortcut"
        id="floating-cart-close"
      >
        <X size={14} strokeWidth={2.5} />
      </button>

      {/* 카트 바로가기 버튼 */}
      <button
        onClick={handleCartClick}
        className="hover:scale-95 active:scale-95 cursor-pointer flex items-center justify-center"
        aria-label="Newed Shop / Instagram"
        id="floating-cart-button"
      >
        {/* 바스켓 아이콘 노출 */}
        <img src={cart} alt="Cart" className="w-30 h-30 md:w-50 md:h-50 transition-transform duration-300 group-hover:rotate-6" />
      </button>
    </div>
  );
}
