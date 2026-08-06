/**
 * 추적 단일 진입점 — GA4(gtag) + GTM(dataLayer→Meta) + Naver 전환을 한 곳에서 발화.
 *
 * 전송 경로 (2026-08 기준, docs/gtm-ga4-topology 참고):
 *   - GA4  : 이 모듈의 initGA()가 gtag.js를 직접 로드해 전송 (GTM엔 GA4 태그 없음 → 이중집계 없음).
 *   - Meta : dataLayer로 conversion_shop/instagram/content 를 push → GTM이 기존 CE 트리거로 소비.
 *   - Naver: naverConversion.ts(wcs.trans)로 전송.
 *
 * 측정 ID(VITE_GA_ID)가 없으면 GA4 호출은 조용히 무시(로컬 개발). dataLayer/Naver 는
 * GTM/wcslog 스니펫이 index.html 에서 항상 로드되므로 GA와 무관하게 동작합니다.
 */

import { trackNaverConversion } from './naverConversion'

// Amplify 콘솔 → 환경변수 VITE_GA_ID (예: G-LM5JB1XLHP)
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID
const isEnabled = Boolean(GA_MEASUREMENT_ID)

let initialized = false

/**
 * gtag.js 를 동적 삽입하고 GA4 를 초기화합니다. main.jsx 에서 1회 호출.
 * ⚠️ send_page_view:false — SPA 라우트 변경마다 trackPageView()로 직접 보내므로,
 * 최초 자동 page_view 를 끄고 중복을 방지합니다.
 */
export function initGA(): void {
  if (!isEnabled || initialized || typeof window === 'undefined') return

  // gtag.js 공식 스니펫 형식 (arguments 객체를 그대로 push 해야 명령으로 인식됨)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    transport_type: 'beacon', // 이탈 직전 이벤트 유실 방지
    send_page_view: false, // SPA — page_view 는 trackPageView 가 라우트마다 전송
  })

  initialized = true
}

/** 범용 GA4 커스텀 이벤트 전송. 도메인 헬퍼들이 내부적으로 사용. */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (!isEnabled || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}

/**
 * 경로 끝의 trailing slash 를 제거해 정규(canonical) 형태로 통일.
 * 루트("/")는 유지하고, 쿼리스트링(?...)은 보존합니다.
 * 예) "/products/deep/" → "/products/deep", "/brand/?x=1" → "/brand?x=1", "/" → "/"
 * GA4 는 trailing slash 제거 필터가 없어, /products/deep 과 /products/deep/ 가
 * 서로 다른 페이지로 갈라져 집계되므로 전송 시점에 미리 통일합니다.
 */
function canonicalPath(path: string): string {
  const queryIndex = path.indexOf('?')
  const pathname = queryIndex === -1 ? path : path.slice(0, queryIndex)
  const query = queryIndex === -1 ? '' : path.slice(queryIndex)
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return trimmed + query
}

/**
 * SPA 라우트별 페이지뷰. react-router 이동 시 App 에서 호출.
 * page_location/page_title 을 명시해 "어느 페이지에서 이벤트가 났나" 분석을 정확히 유지.
 * ⚠️ GA4 의 "페이지 경로" 차원은 page_location 을 파싱해 만들어지므로, page_location 도
 *    정규화한 경로로 재구성해 trailing slash 로 인한 페이지 분리를 방지합니다.
 */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return
  const normalizedPath = canonicalPath(path)
  trackEvent('page_view', {
    page_path: normalizedPath,
    page_location: window.location.origin + normalizedPath,
    page_title: document.title,
  })
}

/* ------------------------------------------------------------------ */
/* GTM(dataLayer) 전환 이벤트 — Meta 데이터 세트 연동용                  */
/* ------------------------------------------------------------------ */

/**
 * GTM 맞춤 이벤트를 dataLayer 로 push. GTM 트리거는 { event: '<이름>' } 객체만
 * 인식하므로(gtag arguments 객체와 다름) 전환은 이 함수로 별도 전송합니다.
 */
function pushDataLayerEvent(
  event: string,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

/**
 * GTM → Meta 픽셀 매핑 전환 이벤트 이름 (GTM 콘솔의 CE 트리거와 1:1).
 *   conversion_shop      → Meta Lead        (카카오 선물하기 이동 = 구매 의도)
 *   conversion_instagram → Meta Contact     (인스타그램 이동 = 문의)
 *   conversion_content   → Meta ViewContent (제품 카드/브랜드 페이지 조회)
 */
export const META_CONVERSION_EVENT = {
  shop: 'conversion_shop',
  instagram: 'conversion_instagram',
  content: 'conversion_content',
} as const

/* ------------------------------------------------------------------ */
/* 도메인별 추적 헬퍼 (컴포넌트에서 호출)                                */
/* ------------------------------------------------------------------ */

/** 내부 내비게이션 클릭 (로고/홈/브랜드 등). source = 발생 위치(header/footer). */
export function trackMenuClick(menuName: string, source = 'header'): void {
  trackEvent('menu_click', { menu_name: menuName, source })
}

/**
 * 구매의도 전환 — 카카오 선물하기 이동. (제품 메뉴 / 카카오 아이콘 / 상세 바로구매)
 * @param source 발생 위치 라벨. 상세 버튼은 'buybutton' + productId 로 상품 구분.
 * @param url    이동 목적지(카카오) URL
 * @param productId deep/bright/decaf (상세 버튼일 때). Meta 는 content_name(=source)로 구분하므로
 *                  상품 구분이 필요하면 source 에 상품을 인코딩(예: buybutton_deep)해 넘깁니다.
 */
export function trackShopClick(source: string, url: string, productId?: string): void {
  trackEvent('outbound_click', { label: 'shop', source, product_id: productId, url })
  pushDataLayerEvent(META_CONVERSION_EVENT.shop, { source, product_id: productId, url })
  trackNaverConversion('apply') // Naver lead(신청완료)
}

/**
 * 문의 전환 — 인스타그램 이동. (이벤트 메뉴 / 인스타 아이콘 / Footer 인스타 / 피드)
 * @param source header | icon | footer | feed
 * @param index  피드 포스트 순번 (feed 일 때)
 */
export function trackInstagramClick(source: string, url: string, index?: number): void {
  trackEvent('outbound_click', { label: 'instagram', source, index, url })
  pushDataLayerEvent(META_CONVERSION_EVENT.instagram, { source, index, url })
  trackNaverConversion('custom') // Naver custom001(문의 대응 타입 없어 사용자정의)
}

/** 콘텐츠조회 전환(dataLayer+Naver) 공통 부분. */
function pushContentConversion(
  contentName: string,
  opts: { productId?: string; source: string },
): void {
  pushDataLayerEvent(META_CONVERSION_EVENT.content, {
    content_name: contentName,
    product_id: opts.productId,
    source: opts.source,
  })
  trackNaverConversion('content') // Naver view_content(콘텐츠보기)
}

/**
 * 제품 카드/관련상품/히어로 등에서 상품으로 이동하는 클릭 = GA4 행동 이벤트.
 * ⚠️ 콘텐츠조회(ViewContent) 전환은 여기서 발화하지 않습니다. 상품 상세 페이지
 * 진입 시(trackContentView, ProductDetail 마운트)에 진입 경로와 무관하게 1회 집계합니다.
 */
export function trackProductClick(
  productName: string,
  productId: string,
  index: number,
): void {
  trackEvent('product_click', { product_name: productName, product_id: productId, index })
}

/** 히어로 슬라이드 탭 → 내부 이동(상품 등). 외부 이동은 trackShopClick 사용. */
export function trackHeroClick(to: string, index: number): void {
  trackEvent('hero_click', { to, index })
}

/**
 * 콘텐츠조회 = 콘텐츠 페이지 도달 1회. (상품 상세 진입 · 브랜드 페이지 진입)
 * 진입 경로(카드/히어로/관련링크/직접 URL) 무관하게 페이지 마운트 시 호출.
 */
export function trackContentView(contentName: string, source: string, productId?: string): void {
  trackEvent('view_content', { content_name: contentName, source, product_id: productId })
  pushContentConversion(contentName, { productId, source })
}

/** IconList 내부 이동 아이콘(BEST 등). 외부 이동 아이콘은 trackShop/Instagram 사용. */
export function trackIconClick(iconName: string): void {
  trackEvent('icon_click', { icon_name: iconName })
}

/** 히어로 슬라이더 수동 전환(화살표/스와이프). 자동재생은 추적하지 않음. */
export function trackHeroSlide(direction: 'prev' | 'next', index: number): void {
  trackEvent('hero_slide', { direction, index })
}

/** 아코디언 열기/닫기 (Footer 사업자정보 등). */
export function trackAccordionToggle(section: string, isOpen: boolean): void {
  trackEvent('accordion_toggle', { section, state: isOpen ? 'open' : 'close' })
}

/** 모달 열기 (개인정보처리방침 등). */
export function trackModalOpen(target: string): void {
  trackEvent('modal_open', { target })
}

/**
 * 임의 섹션 이름을 GA4 이벤트 이름 토큰으로 정규화 (소문자/영숫자·언더스코어).
 * 예) "Hero" → "hero", "MainImage" → "main_image"
 */
function toEventToken(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

/**
 * 섹션 방문 1건. 섹션을 "떠나는" 시점에 체류시간(seconds)과 함께 섹션 고유 이벤트
 * (section_<섹션>)로 전송. 호출 측(useSectionTracking)에서 1초 이상 체류만 전달.
 */
export function trackSectionVisit(section: string, seconds: number): void {
  if (!Number.isFinite(seconds) || seconds <= 0) return
  trackEvent(`section_${toEventToken(section)}`, { section, seconds })
}
