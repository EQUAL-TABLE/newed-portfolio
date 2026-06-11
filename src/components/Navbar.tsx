import React, { useState } from "react";
import { Menu, X } from "lucide-react";

// Props 타입 정의
interface NavbarProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  storiesRef: React.RefObject<HTMLDivElement | null>;
  productRef: React.RefObject<HTMLDivElement | null>;
}

export default function Navbar({ heroRef, storiesRef, productRef }: NavbarProps) {
  // 모바일 메뉴 열림/닫힘 상태를 관리하는 state
  const [isOpen, setIsOpen] = useState(false);

  // 부드럽게 지정한 섹션으로 스크롤 이동시키는 함수 (네비게이션 바 높이에 따른 오프셋 계산 적용)
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      const navbarElement = document.getElementById("main-navbar");
      const navbarHeight = navbarElement ? navbarElement.offsetHeight : 90;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false); // 모바일 메뉴 클릭 시 메뉴창 닫기
    }
  };

  // 인스타그램 새 창 이동 함수
  const openInstagram = () => {
    window.open("https://www.instagram.com/newed_official/", "_blank");
    setIsOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-[#F5E6A3] border-b border-[#ebd787]/50 px-6 md:px-12 xl:px-[100px] pt-6 md:pt-12 xl:pt-[100px] pb-4 md:pb-6 xl:pb-[30px]"
      style={{ marginLeft: "0px", height: "auto" }}
      id="main-navbar"
    >
      <div className="w-full md:grid md:grid-cols-4 md:items-center flex items-center justify-between" id="navbar-inner-grid">
        {/* 왼쪽: NEWED 타원형 로고 배지 (4분할 중 좌측 1칸) */}
        <div 
          className="md:col-span-1 flex justify-start items-center cursor-pointer select-none"
          onClick={() => scrollToSection(heroRef)}
          id="navbar-logo-container"
        >
          <div 
            className="bg-[#4A90D9] text-white font-bold px-6 py-2 text-base md:text-lg lg:text-xl rounded-full tracking-wider border border-[#4A90D9] hover:bg-opacity-90 transition-all duration-300 shadow-sm"
            style={{ borderRadius: "50% / 50%" }} // 대칭 타원형 실현
            id="navbar-logo-badge"
          >
            NEWED
          </div>
        </div>

        {/* 오른쪽: 웹 크기의 가로 메뉴 목록 (4분할 중 우측 3칸 영역을 묶어 4개 메뉴를 균등 배치) */}
        <div className="hidden md:flex md:col-span-3 items-center justify-between w-full" id="navbar-web-menu">
          <button
            onClick={() => scrollToSection(heroRef)}
            className="font-bold text-[#1A1A1A] text-lg md:text-2xl lg:text-3xl xl:text-[50px] tracking-[-0.05em] leading-none uppercase hover:text-[#E8610A] transition-colors cursor-pointer"
            id="web-menu-homepage"
          >
            HOMEPAGE
          </button>
          <button
            onClick={() => scrollToSection(storiesRef)}
            className="font-bold text-[#1A1A1A] text-lg md:text-2xl lg:text-3xl xl:text-[50px] tracking-[-0.05em] leading-none uppercase hover:text-[#E8610A] transition-colors cursor-pointer"
            id="web-menu-stories"
          >
            STORIES
          </button>
          <button
            onClick={() => scrollToSection(productRef)}
            className="font-bold text-[#1A1A1A] text-lg md:text-2xl lg:text-3xl xl:text-[50px] tracking-[-0.05em] leading-none uppercase hover:text-[#E8610A] transition-colors cursor-pointer"
            id="web-menu-product"
          >
            PRODUCT
          </button>
          <button
            onClick={openInstagram}
            className="font-bold text-[#1A1A1A] text-lg md:text-2xl lg:text-3xl xl:text-[50px] tracking-[-0.05em] leading-none uppercase hover:text-[#E8610A] transition-colors cursor-pointer"
            id="web-menu-instagram"
          >
            INSTAGRAM
          </button>
        </div>

        {/* 오른쪽: 모바일 햄버거 토글 버튼 (768px 미만) */}
        <div className="md:hidden flex items-center" id="navbar-mobile-toggle-container">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1A1A1A] hover:text-[#E8610A] transition-colors p-1 cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
            id="navbar-mobile-hamburger"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 모바일 전체 화면 드롭다운 오버레이 슬라이드 메뉴 */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-[#F5E6A3] border-b border-[#1a1a1a]/10 flex flex-col items-center py-6 space-y-5 shadow-lg md:hidden animate-fade-in"
          id="navbar-mobile-dropdown"
        >
          <button
            onClick={() => scrollToSection(heroRef)}
            className="w-full text-center py-2 font-bold text-[#1A1A1A] text-lg uppercase hover:bg-[#F0DE94] transition-colors cursor-pointer"
            id="mobile-menu-homepage"
          >
            HOMEPAGE
          </button>
          <button
            onClick={() => scrollToSection(storiesRef)}
            className="w-full text-center py-2 font-bold text-[#1A1A1A] text-lg uppercase hover:bg-[#F0DE94] transition-colors cursor-pointer"
            id="mobile-menu-stories"
          >
            STORIES
          </button>
          <button
            onClick={() => scrollToSection(productRef)}
            className="w-full text-center py-2 font-bold text-[#1A1A1A] text-lg uppercase hover:bg-[#F0DE94] transition-colors cursor-pointer"
            id="mobile-menu-product"
          >
            PRODUCT
          </button>
          <button
            onClick={openInstagram}
            className="w-full text-center py-2 font-bold text-[#1A1A1A] text-lg uppercase hover:bg-[#F0DE94] transition-colors cursor-pointer"
            id="mobile-menu-instagram"
          >
            INSTAGRAM
          </button>
        </div>
      )}
    </nav>
  );
}
