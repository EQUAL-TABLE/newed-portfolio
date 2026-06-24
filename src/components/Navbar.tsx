import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo_bright from "../assets/images/logo_bright.webp";
import {
  trackMenuClick,
  trackOutbound,
  trackUiToggle,
} from "../lib/analytics";

// 와디즈 스토어 URL (SHOP 버튼 / 추적 라벨에서 공통 사용)
const WADIZ_STORE_URL =
  "https://www.wadiz.kr/web/wcomingsoon/rwd/399604?utm_source=wadizshare_in&utm_medium=share&sharer=1069001&walinkid=81502244";
const INSTAGRAM_URL = "https://www.instagram.com/newed_official/";

// Props 타입 정의
interface NavbarProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  storiesRef: React.RefObject<HTMLDivElement | null>;
  productRef: React.RefObject<HTMLDivElement | null>;
}

export default function Navbar({
  heroRef,
  storiesRef,
  productRef,
}: NavbarProps) {
  // 모바일 메뉴 열림/닫힘 상태를 관리하는 state
  const [isOpen, setIsOpen] = useState(false);

  // 부드럽게 지정한 섹션으로 스크롤 이동시키는 함수 (네비게이션 바 높이에 따른 오프셋 계산 적용)
  // menuName / device: GA4 메뉴 클릭 추적용 (이동 동작에는 영향 없음)
  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement | null>,
    menuName: string,
    device: "web" | "mobile" = "web",
  ) => {
    trackMenuClick(menuName, device);
    if (ref.current) {
      const elementPosition =
        ref.current.getBoundingClientRect().top + window.scrollY;
      const navbarElement = document.getElementById("main-navbar");
      const navbarHeight = navbarElement ? navbarElement.offsetHeight : 90;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false); // 모바일 메뉴 클릭 시 메뉴창 닫기
    }
  };

  // 인스타그램 새 창 이동 함수
  const openInstagram = () => {
    trackOutbound("instagram", INSTAGRAM_URL);
    window.open(INSTAGRAM_URL, "_blank");
    setIsOpen(false);
  };

  const openStore = () => {
    trackOutbound("shop_wadiz", WADIZ_STORE_URL);
    window.open(WADIZ_STORE_URL, "_blank");
    setIsOpen(false);
  };

  // 모바일 햄버거 메뉴 토글 (열림/닫힘 상태를 GA4로 추적)
  const toggleMobileMenu = () => {
    const next = !isOpen;
    trackUiToggle("mobile_menu", next);
    setIsOpen(next);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-[#fae6aa] border-b border-[#fae6aa]/50 pt-4 sm:pt-6 md:pt-8 lg:pt-12 xl:pt-[20px] pb-3 sm:pb-4 md:pb-5 lg:pb-6 xl:pb-[10px]"
      style={{ marginLeft: "0px", height: "auto" }}
      id="main-navbar"
    >
      <div
        className="w-full max-w-[1980px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]"
        id="navbar-container"
      >
        <div
          className="w-full md:grid md:grid-cols-4 md:items-center flex items-center justify-between"
          id="navbar-inner-grid"
        >
          {/* 왼쪽: NEWED 타원형 로고 배지 (4분할 중 좌측 1칸) */}
          <div
            className="md:col-span-1 flex justify-start items-center cursor-pointer select-none"
            onClick={() => scrollToSection(heroRef, "logo")}
            id="navbar-logo-container"
          >
            <div>
              <img
                src={logo_bright}
                alt="NEWED Logo"
                className="w-24 sm:w-28 md:w-36 lg:w-40 xl:w-45 h-auto object-contain"
                id="navbar-logo-image"
              />
            </div>
          </div>

          {/* 오른쪽: 웹 크기의 가로 메뉴 목록 (4분할 중 우측 3칸 영역을 묶어 4개 메뉴를 양쪽끝에서부터 균등 배치) */}
          <div
            className="hidden md:flex md:col-span-3 items-center justify-between w-full md:pl-8 lg:pl-12 xl:pl-40"
            id="navbar-web-menu"
          >
            <button
              onClick={() => scrollToSection(heroRef, "homepage")}
              className="font-bold text-[#000000] uppercase hover:text-[#ec7123] transition-colors cursor-pointer whitespace-nowrap"
              style={{
                fontSize: "clamp(13px, 2.5vw, 30px)",
                letterSpacing: "-0.05em",
                lineHeight: "1",
              }}
              id="web-menu-homepage"
            >
              HOMEPAGE
            </button>
            <button
              onClick={() => scrollToSection(storiesRef, "stories")}
              className="font-bold text-[#000000] uppercase hover:text-[#ec7123] transition-colors cursor-pointer whitespace-nowrap"
              style={{
                fontSize: "clamp(13px, 2.5vw, 30px)",
                letterSpacing: "-0.05em",
                lineHeight: "1",
              }}
              id="web-menu-stories"
            >
              STORIES
            </button>
            <button
              onClick={() => scrollToSection(productRef, "product")}
              className="font-bold text-[#000000] uppercase hover:text-[#ec7123] transition-colors cursor-pointer whitespace-nowrap"
              style={{
                fontSize: "clamp(13px, 2.5vw, 30px)",
                letterSpacing: "-0.05em",
                lineHeight: "1",
              }}
              id="web-menu-product"
            >
              PRODUCT
            </button>
            <button
              onClick={openStore}
              className="font-bold text-[#000000] uppercase hover:text-[#ec7123] transition-colors cursor-pointer whitespace-nowrap"
              style={{
                fontSize: "clamp(13px, 2.5vw, 30px)",
                letterSpacing: "-0.05em",
                lineHeight: "1",
              }}
              id="web-menu-instagram"
            >
              SHOP
            </button>
            <button
              onClick={openInstagram}
              className="font-bold text-[#000000] uppercase hover:text-[#ec7123] transition-colors cursor-pointer whitespace-nowrap"
              style={{
                fontSize: "clamp(13px, 2.5vw, 30px)",
                letterSpacing: "-0.05em",
                lineHeight: "1",
              }}
              id="web-menu-instagram"
            >
              INSTAGRAM
            </button>
          </div>

          {/* 오른쪽: 모바일 햄버거 토글 버튼 (768px 미만) */}
          <div
            className="md:hidden flex items-center"
            id="navbar-mobile-toggle-container"
          >
            <button
              onClick={toggleMobileMenu}
              className="text-[#000000] hover:text-[#ec7123] transition-colors p-1 cursor-pointer focus:outline-none"
              aria-label="Toggle menu"
              id="navbar-mobile-hamburger"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 전체 화면 드롭다운 오버레이 슬라이드 메뉴 */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-[#fae6aa] border-b border-[#000000]/10 flex flex-col items-center py-6 space-y-5 shadow-lg md:hidden animate-fade-in"
          id="navbar-mobile-dropdown"
        >
          <button
            onClick={() => scrollToSection(heroRef, "homepage", "mobile")}
            className="w-full text-center py-2 font-bold text-[#000000] text-lg uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-homepage"
          >
            HOMEPAGE
          </button>
          <button
            onClick={() => scrollToSection(storiesRef, "stories", "mobile")}
            className="w-full text-center py-2 font-bold text-[#000000] text-lg uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-stories"
          >
            STORIES
          </button>
          <button
            onClick={() => scrollToSection(productRef, "product", "mobile")}
            className="w-full text-center py-2 font-bold text-[#000000] text-lg uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-product"
          >
            PRODUCT
          </button>
                    <button
            onClick={openStore}
            className="w-full text-center py-2 font-bold text-[#000000] text-lg uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-shop"
          >
            SHOP
          </button>
          <button
            onClick={openInstagram}
            className="w-full text-center py-2 font-bold text-[#000000] text-lg uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-instagram"
          >
            INSTAGRAM
          </button>
        </div>
      )}
    </nav>
  );
}
