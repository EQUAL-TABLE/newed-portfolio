/**
 * Google Analytics 4 (gtag.js) 연동 모듈
 *
 * - 모든 추적은 이 모듈을 단일 진입점으로 통과시켜 이벤트 이름/파라미터 일관성을 보장합니다.
 * - 측정 ID는 AWS Amplify 환경변수(VITE_GA_ID)로 주입되며, 빌드 타임에 코드에 포함됩니다.
 * - 측정 ID가 없으면(주로 로컬 개발) 모든 추적 호출은 조용히 무시됩니다.
 */

// Amplify 콘솔 → 환경변수에 등록된 GA4 측정 ID (예: G-LM5JB1XLHP)
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID;

// 측정 ID가 존재할 때만 추적을 활성화 (개발 환경 노이즈 방지)
const isEnabled = Boolean(GA_MEASUREMENT_ID);

let initialized = false;

/**
 * gtag.js 스크립트를 동적으로 삽입하고 GA4를 초기화합니다.
 * 앱 진입점(main.tsx)에서 1회만 호출합니다.
 */
export function initGA(): void {
  if (!isEnabled || initialized || typeof window === "undefined") return;

  // dataLayer 및 gtag 함수 부트스트랩
  // ⚠️ 반드시 'arguments' 객체를 그대로 push 해야 합니다.
  // gtag.js는 dataLayer 항목이 arguments 객체일 때만 gtag 명령(config/event)으로
  // 인식하여 조회(hit)를 전송합니다. (...args) 배열을 push하면 명령으로 인식되지 않아
  // 태그는 로드되지만 데이터가 전혀 전송되지 않습니다. (Google 공식 스니펫 형식)
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  // gtag.js 외부 스크립트 비동기 로드
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  // 단일 페이지(SPA)이므로 초기 page_view는 기본값으로 자동 전송됩니다.
  window.gtag("config", GA_MEASUREMENT_ID, {
    // 종료/이탈 직전 이벤트의 유실을 줄이기 위해 beacon 전송 사용
    transport_type: "beacon",
  });

  initialized = true;
}

/**
 * 범용 커스텀 이벤트 전송. 도메인 헬퍼들이 내부적으로 사용합니다.
 */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (!isEnabled || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

/* ------------------------------------------------------------------ */
/* 도메인별 추적 헬퍼                                                  */
/* ------------------------------------------------------------------ */

type Device = "web" | "mobile";

/** 상단바 내부 메뉴 클릭 (HOMEPAGE / STORIES / PRODUCT / 로고) */
export function trackMenuClick(menuName: string, device: Device): void {
  trackEvent("menu_click", { menu_name: menuName, device });
}

/** 외부 사이트로 이동하는 전환성 클릭 (와디즈 스토어 / 인스타그램) */
export function trackOutbound(label: string, url: string): void {
  trackEvent("outbound_click", { label, url });
}

/** 슬라이더 썸네일(슬라이드 전환) 클릭 */
export function trackSliderThumb(index: number): void {
  trackEvent("slider_thumb_click", { index });
}

/** 아코디언 열기/닫기 토글 (Stories MORE, 제품 상세 등) */
export function trackAccordionToggle(section: string, isOpen: boolean): void {
  trackEvent("accordion_toggle", {
    section,
    state: isOpen ? "open" : "close",
  });
}

/** 제품 카드 클릭 (제품명/인덱스 포함) */
export function trackProductClick(
  productName: string,
  index: number,
  isOpen: boolean,
): void {
  trackEvent("product_click", {
    product_name: productName,
    index,
    state: isOpen ? "open" : "close",
  });
}

/** UI 토글 (모바일 햄버거 메뉴 등) */
export function trackUiToggle(target: string, isOpen: boolean): void {
  trackEvent("ui_toggle", { target, state: isOpen ? "open" : "close" });
}

/** 섹션이 화면에 처음 노출됨 (스크롤 도달) */
export function trackSectionView(section: string): void {
  trackEvent("section_view", { section });
}

/** 섹션 체류시간 (초 단위) */
export function trackSectionDwell(section: string, seconds: number): void {
  // 0초/비정상값은 전송하지 않음
  if (!Number.isFinite(seconds) || seconds <= 0) return;
  trackEvent("section_dwell", { section, seconds });
}
