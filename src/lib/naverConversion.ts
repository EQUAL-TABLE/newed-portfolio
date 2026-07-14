/**
 * 네이버 검색광고(SA) 전환 추적 모듈
 *
 * - 네이버 전환 스크립트(wcslog.js)는 index.html에서 로드되며, 페이지 진입 시
 *   유입(inflow) + 페이지뷰(PV)만 1회 수집합니다.
 * - 본 사이트는 SPA(싱글페이지)라 메뉴 클릭 시 URL/문서 전환이 없으므로,
 *   "전환이 발생하는 시점(버튼 클릭)"에 이 모듈로 전환 이벤트를 직접 전송합니다.
 * - 전송 방식은 네이버 전환 스크립트 설치 가이드 스펙 그대로 wcs.trans(_conv)를 사용하며,
 *   _conv.type 값으로 전환 종류를 구분합니다.
 * - GA4(analytics.ts)와 별개의 독립 채널입니다. 두 추적을 함께 호출해도 무방합니다.
 */

// 검수 사이트 AccountId (index.html의 wcs_add['wa']와 동일). 가이드상 전환 전송 전 설정 필요.
const NAVER_ACCOUNT_ID = "s_1125a081216";

/**
 * 전환 종류 → 네이버 가이드의 _conv.type 값 매핑.
 *
 *   lead         : 신청완료  (상단 메뉴 SHOP → 와디즈 스토어)
 *   schedule     : 예약완료  (상단 메뉴 INSTAGRAM)
 *   view_content : 콘텐츠보기 (상단 메뉴 STORIES)
 *   custom001    : 사용자정의 (상단 메뉴 PRODUCT) — custom001~custom010 중 001번 사용
 */
export type NaverConversionKey = "apply" | "reserve" | "content" | "custom";

const CONVERSION_TYPE: Record<NaverConversionKey, string> = {
  apply: "lead",
  reserve: "schedule",
  content: "view_content",
  custom: "custom001",
};

/**
 * 네이버 전환 이벤트 1건을 즉시 전송합니다.
 *
 * ⚠️ 유실 방지 호출 순서
 *   외부 이동(window.open / location 변경)을 동반하는 버튼(SHOP·INSTAGRAM)에서는
 *   반드시 이 함수를 "이동을 실행하기 전에" 호출해야 합니다. wcs.trans()는 이미지
 *   비콘(GET) 방식으로 요청을 시작하므로, 페이지가 활성 상태일 때 호출을 선행시켜야
 *   전송이 누락되지 않습니다. (본 사이트는 _blank 새 창이라 이탈 위험이 낮지만,
 *   동일 규칙을 지켜 안전하게 처리합니다.)
 *
 * wcslog.js 미로드/차단 등으로 전역이 없으면 조용히 무시합니다(비차단).
 */
export function trackNaverConversion(key: NaverConversionKey): void {
  if (typeof window === "undefined") return;

  const { wcs } = window;
  // 스크립트가 아직 로드되지 않았거나 광고 차단 등으로 없을 수 있음 → 방어적 가드
  if (!wcs || typeof wcs.trans !== "function") return;

  // 가이드 스펙: 전환 전송 전 계정 공통키(wa) 설정. index.html에서 이미 설정되지만
  // 전역 유실 대비해 방어적으로 재설정(동일 값이라 멱등).
  window.wcs_add = window.wcs_add || {};
  window.wcs_add["wa"] = NAVER_ACCOUNT_ID;

  const _conv: Record<string, string> = { type: CONVERSION_TYPE[key] };
  wcs.trans(_conv);
}
