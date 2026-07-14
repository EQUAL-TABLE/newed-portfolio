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
/* GTM(dataLayer) 전환 이벤트 버스 — Meta 픽셀/데이터 세트 연동용        */
/* ------------------------------------------------------------------ */

/**
 * GTM 맞춤 이벤트(Custom Event)를 dataLayer로 전송합니다.
 *
 * ⚠️ GA4(gtag)와는 전송 형식이 다릅니다.
 *   - gtag("event", ...)는 dataLayer에 'arguments' 객체를 push하며, 이는 GTM의
 *     맞춤 이벤트 트리거가 인식하지 못합니다(= GTM으로 태그를 붙일 수 없음).
 *   - GTM 트리거는 반드시 { event: '<이름>' } 형태의 '객체'를 push해야 잡습니다.
 *   따라서 GTM → Meta 픽셀 연동이 필요한 전환 이벤트는 이 함수로 별도 전송합니다.
 *
 * GA4 활성화 여부(VITE_GA_ID)와 무관하게 동작합니다. GTM 스니펫은 index.html에서
 * 항상 로드되므로, GA가 꺼진 환경에서도 GTM/Meta 쪽 전환은 정상 수집되어야 합니다.
 * dataLayer는 GTM 스니펫이 <head> 최상단에서 이미 생성하지만 방어적으로 초기화합니다.
 */
function pushDataLayerEvent(
  event: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * GTM → Meta 픽셀로 매핑할 전환 이벤트 이름.
 * GTM 콘솔에서 아래 이름 그대로 "맞춤 이벤트" 트리거를 만들어 Meta 표준 이벤트에 연결합니다.
 *
 *   conversion_shop      → Meta 'Lead'        (와디즈 스토어 이동 = 구매 의도)
 *   conversion_instagram → Meta 'Contact'     (인스타그램 이동 = 문의)
 *   conversion_content   → Meta 'ViewContent' (STORIES/제품 콘텐츠 조회)
 */
export const META_CONVERSION_EVENT = {
  shop: "conversion_shop",
  instagram: "conversion_instagram",
  content: "conversion_content",
} as const;

/* ------------------------------------------------------------------ */
/* 도메인별 추적 헬퍼                                                  */
/* ------------------------------------------------------------------ */

type Device = "web" | "mobile";

/** 상단바 내부 메뉴 클릭 (HOMEPAGE / STORIES / PRODUCT / 로고) */
export function trackMenuClick(menuName: string, device: Device): void {
  trackEvent("menu_click", { menu_name: menuName, device });

  // STORIES 메뉴 = 콘텐츠 조회 전환 → Meta 'ViewContent'
  if (menuName === "stories") {
    pushDataLayerEvent(META_CONVERSION_EVENT.content, {
      content_name: "stories",
      source: "menu",
    });
  }
}

/** 외부 사이트로 이동하는 전환성 클릭 (와디즈 스토어 / 인스타그램) */
export function trackOutbound(label: string, url: string): void {
  trackEvent("outbound_click", { label, url });

  // 라벨 규약(shop_wadiz_* / instagram_*)으로 전환 종류를 판별해 GTM 전환 이벤트도 전송.
  // 모든 SHOP/인스타 버튼이 이 함수를 단일 경유하므로 여기 한 곳에서 매핑합니다.
  if (label.startsWith("shop_wadiz")) {
    // 와디즈 스토어 이동 = 구매 의도 → Meta 'Lead'
    pushDataLayerEvent(META_CONVERSION_EVENT.shop, { source: label, url });
  } else if (label.includes("instagram")) {
    // 인스타그램 이동 = 문의 → Meta 'Contact'
    pushDataLayerEvent(META_CONVERSION_EVENT.instagram, { source: label, url });
  }
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

  // 카드를 '여는' 동작만 콘텐츠 조회 전환으로 집계 → Meta 'ViewContent'
  // (닫기는 전환이 아니므로 제외)
  if (isOpen) {
    pushDataLayerEvent(META_CONVERSION_EVENT.content, {
      content_name: productName,
      source: "product",
    });
  }
}

/** UI 토글 (모바일 햄버거 메뉴 등) */
export function trackUiToggle(target: string, isOpen: boolean): void {
  trackEvent("ui_toggle", { target, state: isOpen ? "open" : "close" });
}

/**
 * 임의의 섹션 이름을 GA4 이벤트 이름 토큰으로 정규화합니다.
 * (소문자, 영숫자/언더스코어만 허용, camelCase는 단어 경계에서 분리)
 * 예) "Hero" → "hero", "BrandStatement" → "brand_statement"
 */
function toEventToken(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // BrandStatement → Brand_Statement
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * 섹션 방문 1건. 섹션을 "떠나는" 시점에 1회 호출되며, 섹션마다 고유한
 * 이벤트 이름(section_<섹션>)으로 체류시간(seconds)을 함께 전송합니다.
 *
 * ⚠️ GA4 경로탐색(Path exploration)의 노드는 '이벤트 이름'만 섹션을 구분할 수 있고
 * 커스텀 파라미터는 노드가 될 수 없습니다. 따라서 섹션마다 고유 이벤트 이름으로
 * 보내 경로탐색에서 "session_start → section_hero → section_product → ..."처럼
 * 섹션당 노드 하나로 깔끔하게 시각화되도록 합니다.
 *
 * 호출 측(useSectionTracking)에서 "1초 이상 체류한 방문"만 전달하므로, 단순히
 * 스크롤로 스쳐 지나간 섹션은 여기까지 도달하지 않습니다. 재방문 시에는 매번
 * 다시 호출되어 왕복 동선이 그대로 경로에 남습니다.
 * section 파라미터도 함께 보내 분류(breakdown)/집계 분석 호환을 유지합니다.
 */
export function trackSectionVisit(section: string, seconds: number): void {
  // 0초/비정상값은 전송하지 않음 (게이트는 호출 측에서 1차 적용)
  if (!Number.isFinite(seconds) || seconds <= 0) return;
  trackEvent(`section_${toEventToken(section)}`, { section, seconds });
}
