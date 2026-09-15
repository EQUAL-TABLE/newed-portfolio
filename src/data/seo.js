// 경로별 SEO 문구(title/description/image) — 문구·대표이미지 수정은 이 파일만 고치면 됩니다.
// canonical / og:url 은 각 페이지의 경로(path)로 Seo 컴포넌트가 자동 생성합니다.
// image 는 og:image 절대경로 조립용 상대경로(선택). 없으면 index.html 의 전역 OGimage.png 사용.

export const seoHome = {
  path: '/',
  // 네이버 권장 40자 이내 (제목/og:title 공용). 아래는 35자.
  title: '뉴드 NEWED | 즐거운 순간엔 선명하게 맛있는 스페셜티 드립백 커피',
  description:
    '즐거운 순간엔 선명하게 맛있는 뉴드 NEWED, 한 모금에 바로 리프레쉬 되는 세상에 없던 새로운 커피',
}

export const seoBrand = {
  path: '/brand',
  title: '뉴드 NEWED | 브랜드 소개 | 즐거운 순간엔 선명하게 맛있는 스페셜티 드립백 커피',
  description:
    '프랑스에 커피가 처음 닿은 도시, 마르세유. 뉴드는 마르세유 커피하우스가 처음 깨운 선명한 감각과 그 새로움을 있는 그대로 즐기던 마르세유 사람들의 자유로운 직관에서 영감을 받았습니다. 우리는 그 시절의 낭만을 현대적으로 재해석해 선명한 즐거움을 선사합니다.',
}

export const seoProductsPage = {
  path: '/products',
  title: '뉴드 NEWED | 제품 소개 | 즐거운 순간엔 선명하게 맛있는 스페셜티 드립백 커피 에디션',
  description:
    '누구나 좋아할 직관적인 맛과 향의 뉴드 드립백 커피 — 달콤 고소한 딥 에디션, 싱그러운 브라이트 에디션, 카페인 중독을 벗어날 디카페인 에디션까지',
}

export const seoReturnPolicy = {
  path: '/return-policy',
  title: '뉴드 NEWED | 반품·환불 정책',
  description:
    '뉴드 반품·환불 및 교환 안내. 배송·교환·반품 문의 070-7954-3783.',
}

// 상품 상세: products.js 의 id 기준. 새 상품 추가 시 여기 한 줄만 더하면 됩니다.
export const seoProducts = {
  deep: {
    title: '뉴드 NEWED | 딥에디션 | 누구나 사랑하는 Sweet & Nutty의 딥 에디션 드립백 커피',
    description:
      '누구나 사랑하는 Sweet & Nutty의 풍미를 담아 고민 없이 선택할 수 있는 커피 원두 라인업, 🍊 검증된 조합의 현대적 재해석 오랑주쇼콜라 🍪 아는 맛이 무서운 크리미넛',
    image: '/og-deep.png',
  },
  bright: {
    title: '뉴드 NEWED | 브라이트에디션 | 싱그러운 과일의 향을 극대화한 Fruity & Rich의 브라이트 에디션 드립백 커피',
    description:
      '싱그러운 과일의 향을 극대화한 Fruity & Rich 커피 원두 라인업, 🍨 직관적인 청량감 리치소르 🍑 역사적 서사를 담은 프리미엄 디저트 피치멜바',
    image: '/og-bright.png',
  },
  decaf: {
    title: '뉴드 NEWED | 디카페에디션 | 디카페인 커피의 한계를 넘어선 Chocolate & Tea의 디카페인 에디션 드립백 커피',
    description:
      '디카페인의 한계를 넘어선 Chocolate & Tea  커피 원두 라인업 🍫 바쁜 하루 끝 가장 부드러운 한 잔 피스타치오가나슈 🍵 산뜻함 그 이상의 특별함 애프리콧아뜰리에',
    image: '/og-decaf.png',
  },
}
