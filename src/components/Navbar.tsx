import React, { useState } from "react";
import logo_bright from "../assets/images/logo_bright.webp";
import { trackMenuClick, trackOutbound, trackUiToggle } from "../lib/analytics";
import {
  trackNaverConversion,
  type NaverConversionKey,
} from "../lib/naverConversion";

// 페이지 내 스크롤 메뉴(menuName)와 네이버 전환 유형 매핑.
// 여기 없는 메뉴(homepage/logo)는 전환 대상이 아니므로 전환 로그를 쏘지 않습니다.
const NAVER_CONVERSION_BY_MENU: Record<string, NaverConversionKey> = {
  stories: "content", // STORIES → 콘텐츠 보기
  product: "custom", // PRODUCT → 사용자정의
};

// 와디즈 스토어 URL (SHOP 버튼 / 추적 라벨에서 공통 사용)
const WADIZ_STORE_URL =
  "https://www.wadiz.kr/web/campaign/detail/398459";
const INSTAGRAM_URL = "https://www.instagram.com/newed_official/";

// Props 타입 정의
interface NavbarProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  storiesRef: React.RefObject<HTMLDivElement | null>;
  productRef: React.RefObject<HTMLDivElement | null>;
  productBannerRef: React.RefObject<HTMLDivElement | null>; // ProductBanner 섹션에 대한 Ref (선택적)
}

export default function Navbar({
  heroRef,
  storiesRef,
  productRef,
  productBannerRef,
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
    // 네이버 전환 대상 메뉴(STORIES/PRODUCT)면 전환 로그 전송.
    // 페이지 내 스크롤이라 이탈이 없어 순서 민감도는 없지만, 클릭 시점에 선행 호출.
    const conversionKey = NAVER_CONVERSION_BY_MENU[menuName];
    if (conversionKey) trackNaverConversion(conversionKey);
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
    // 외부 이동(새 창) 전에 추적을 모두 선행 호출하여 로그 유실 방지 (예약완료 전환)
    trackOutbound("instagram_navbar", INSTAGRAM_URL);
    trackNaverConversion("reserve");
    window.open(INSTAGRAM_URL, "_blank");
    setIsOpen(false);
  };

  const openStore = () => {
    // 외부 이동(새 창) 전에 추적을 모두 선행 호출하여 로그 유실 방지 (신청완료 전환)
    trackOutbound("shop_wadiz_navbar", WADIZ_STORE_URL);
    trackNaverConversion("apply");
    window.open(WADIZ_STORE_URL, "_blank");
    setIsOpen(false);
  };

  // 모바일 햄버거 메뉴 토글 (열림/닫힘 상태를 GA4로 추적)
  const toggleMobileMenu = () => {
    const next = !isOpen;
    trackUiToggle("mobile_menu", next);
    setIsOpen(next);
  };

  // 로고 클릭 핸들러: 모바일(<768px)에서는 메뉴 토글, 데스크탑에서는 Hero 섹션으로 스크롤
  const handleLogoClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      toggleMobileMenu();
    } else {
      scrollToSection(heroRef, "logo");
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50
        bg-[#fae6aa] border-b border-[#fae6aa]/50 
        pt-1 sm:pt-2 md:pt-3 lg:pt-4 xl:pt-5 
        pb-1 sm:pb-1 md:pb-2 lg:pb-2 xl:pb-2.5"
      style={{ marginLeft: "0px", height: "auto" }}
      id="main-navbar"
    >
      <div
        className="w-full max-w-[1980px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px]"
        id="navbar-container"
      >
        <div
          className="w-full md:grid md:grid-cols-4 md:items-center flex items-center justify-center"
          id="navbar-inner-grid"
        >
          {/* 왼쪽: NEWED 타원형 로고 배지 (4분할 중 좌측 1칸) */}
          <div
            className="md:col-span-1 flex justify-center md:justify-start items-center cursor-pointer select-none"
            onClick={handleLogoClick}
            id="navbar-logo-container"
          >
            <div>
              <img
                src={logo_bright}
                alt="NEWED Logo"
                className="w-50 sm:w-50 md:w-50 lg:w-40 xl:w-45 h-auto object-contain
                py-1.5"
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
              onClick={() => scrollToSection(productBannerRef, "product")}
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

        </div>
      </div>

      {/* 모바일 전체 화면 드롭다운 오버레이 슬라이드 메뉴 */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full bg-[#fae6aa] border-b border-[#000000]/10 flex flex-col items-center shadow-lg md:hidden animate-fade-in"
          id="navbar-mobile-dropdown"
        >
          <button
            onClick={() => scrollToSection(heroRef, "homepage", "mobile")}
            className="w-full text-left pt-2.5 px-4 sm:px-6 pb-2.5 font-bold text-[#000000] text-4xl uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-homepage"
          >
            HOMEPAGE
          </button>
          <button
            onClick={() => scrollToSection(storiesRef, "stories", "mobile")}
            className="w-full text-left px-4 sm:px-6 pb-2.5 font-bold text-[#000000] text-4xl uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-stories"
          >
            STORIES
          </button>
          <button
            onClick={() => scrollToSection(productBannerRef, "product", "mobile")}
            className="w-full text-left px-4 sm:px-6 pb-2.5 font-bold text-[#000000] text-4xl uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-product"
          >
            PRODUCT
          </button>
          <button
            onClick={openStore}
            className="w-full text-left px-4 sm:px-6 pb-2.5 font-bold text-[#000000] text-4xl uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-shop"
          >
            SHOP
          </button>
          <button
            onClick={openInstagram}
            className="w-full text-left px-4 sm:px-6 pb-2.5 font-bold text-[#000000] text-4xl uppercase hover:bg-[#fae6aa] transition-colors cursor-pointer"
            id="mobile-menu-instagram"
          >
            INSTAGRAM
          </button>
        </div>
      )}
    </nav>
  );
}
