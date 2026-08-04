// 경로별 SEO 문구(title/description) — 문구 수정은 이 파일만 고치면 됩니다.
// canonical / og:url 은 각 페이지의 경로(path)로 Seo 컴포넌트가 자동 생성합니다.

export const seoHome = {
  path: '/',
  title: '뉴드 NEWED — 열자마자 기분 좋아지는  드립백 커피',
  description:
    '한 모금에 선명한 향과 맛. 간편하게 즐기는 스페셜티커피',
}

export const seoBrand = {
  path: '/brand',
  title: '브랜드 이야기 — 뉴드 NEWED | 선명하게 느껴지는 즐거움',
  description:
    '마르세유 커피하우스에서 영감받은 뉴드. 복잡한 노트 대신 첫 모금의 선명한 즐거움을 전하는 가향 드립백 브랜드.',
}

// 상품 상세: products.js 의 id 기준. 새 상품 추가 시 여기 한 줄만 더하면 됩니다.
export const seoProducts = {
  deep: {
    title: '뉴드 드립백 딥 에디션 — Sweet & Nutty | 뉴드 NEWED',
    description:
      '짙은 다크초콜릿에 오렌지의 산뜻한 킥, 오랑주쇼콜라. 누구나 사랑하는 딥 에디션 드립백. 14,000원.',
  },
  bright: {
    title: '뉴드 드립백 브라이트 에디션 — Fruity | 뉴드 NEWED',
    description:
      '풍부한 과일 향과 상큼한 산미의 Fruity. 새로운 맛의 모험, 브라이트 에디션 드립백. 14,000원.',
  },
  decaf: {
    title: '뉴드 드립백 디카페인 에디션 — Decaf | 뉴드 NEWED',
    description:
      '디카페인으로도 깊은 풍미와 부드러운 맛. 한계를 넘어선 디카페인 에디션 드립백. 14,000원.',
  },
}
