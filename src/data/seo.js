// 경로별 SEO 문구(title/description) — 문구 수정은 이 파일만 고치면 됩니다.
// canonical / og:url 은 각 페이지의 경로(path)로 Seo 컴포넌트가 자동 생성합니다.

export const seoHome = {
  path: '/',
  title: '뉴드 NEWED | 한 모금에 선명한 향과 맛. 간편하게 즐기는 스페셜티커피',
  description:
    '한 모금에 선명한 향과 맛. 간편하게 즐기는 스페셜티커피',
}

export const seoBrand = {
  path: '/brand',
  title: '뉴드 NEWED | 브랜드 소개 | 선명하게 느껴지는 즐거움',
  description:
    '마르세유 커피하우스에서 영감받은 뉴드. 첫 모금의 선명한 즐거움을 전하는 스페셜티커피.',
}

// 상품 상세: products.js 의 id 기준. 새 상품 추가 시 여기 한 줄만 더하면 됩니다.
export const seoProducts = {
  deep: {
    title: '뉴드 드립백 딥 에디션 | 뉴드 NEWED',
    description:
      '누구나 사랑하는 Sweet & Nutty. 오랑주쇼콜라. 크리미넛.',
  },
  bright: {
    title: '뉴드 드립백 브라이트 에디션 | 뉴드 NEWED',
    description:
      '싱그러운 과일 산미의 Fruity. 피치멜바. 리치소르베. ',
  },
  decaf: {
    title: '뉴드 드립백 디카페인 에디션 | 뉴드 NEWED',
    description:
      '한계를 넘어선 새로운 Decaf. 피스타치오가나슈. 애프리콧아뜰리에.',
  },
}
