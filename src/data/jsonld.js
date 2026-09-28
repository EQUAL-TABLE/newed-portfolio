// JSON-LD(구조화 데이터) 객체 생성 — Seo.jsx(런타임)와 scripts/prerender-seo.mjs(정적 빌드) 양쪽에서 공유합니다.
// 순수 데이터 변환 함수만 두고 React/Node 전용 코드는 넣지 않아야 두 곳에서 동일하게 import 됩니다.

const SITE_URL = 'https://www.newed.kr'

// 홈: 회사(Organization) — Footer.jsx 의 사업자정보와 동일한 값을 사용합니다.
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '뉴드 NEWED',
    legalName: '주식회사 이퀄테이블',
    url: SITE_URL,
    logo: `${SITE_URL}/OGimage.png`,
    sameAs: ['https://www.instagram.com/newed_official/'],
  }
}

// 홈: 사이트(WebSite)
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '뉴드 NEWED',
    url: SITE_URL,
  }
}

// 상품 상세: Product. seoImage 는 seo.js 의 seoProducts[id].image(상대경로, 선택).
// 재고: 수량 관리를 하지 않으므로 항상 InStock 고정. 리뷰/평점 필드는 newed.kr 자체 수집 데이터가
// 없어 넣지 않음(근거 없는 aggregateRating은 검색엔진 스팸 정책 위험).
export function productJsonLd(product, seoImage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description.replace(/<\/?br\s*\/?>/gi, ' ').trim(),
    image: seoImage ? `${SITE_URL}${seoImage}` : undefined,
    brand: { '@type': 'Brand', name: '뉴드 NEWED' },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.id}`,
      priceCurrency: 'KRW',
      price: String(product.price).replace(/[^\d]/g, ''),
      availability: 'https://schema.org/InStock',
    },
  }
}
