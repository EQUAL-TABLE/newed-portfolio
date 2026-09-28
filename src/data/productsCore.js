// 상품의 텍스트/가격 데이터만 모은 모듈 — 이미지 파일을 import 하지 않습니다.
// products.js(React, 이미지 포함)와 scripts/prerender-seo.mjs(Node, Vite 없이 실행)가
// 공통으로 이 파일을 참조합니다. Node 스크립트는 .png/.webp import 를 처리할 수 없으므로
// 이미지가 필요 없는 JSON-LD 생성 쪽은 반드시 이 파일만 import 해야 합니다.
export const productsCore = [
  {
    id: 'deep',
    badge: '누구나 사랑하는 Sweet & Nutty',
    name: '뉴드 드립백 딥 에디션',
    detailName: '뉴드 드립백 딥 에디션 커피',
    accent: 'var(--orange)',
    price: '14,000원',
    description:
      '누구나 사랑하는 Sweet & Nutty의 풍미를 담아<br />고민 없이 선택할 수 있는 라인업 🍫<br /><br />🍊 검증된 조합의 현대적 재해석, 오랑주쇼콜라<br />🍪 아는 맛이 무서운 , 크리미넛',
    srOnlyDesc:
      '누구에게나 사랑받는 오렌지, 초콜릿 향의 오랑주 쇼콜라와 익숙하면서 중독적인 버터 쿠키 향의 크리미넛으로 세상에 없던 새로운 드립백을 만나보세요.',
    to: 'https://kko.to/CC1C1xYfhF',
    innerTo: '/products/deep',
  },
  {
    id: 'bright',
    badge: '싱그러운 과일 향의 Fruity',
    name: '뉴드 드립백 브라이트 에디션',
    detailName: '뉴드 드립백 브라이트 에디션 커피',
    accent: 'var(--blue)',
    price: '14,000원',
    description:
      '싱그러운 과일의 향을 극대화한 Fruity & Rich 라인업 🍋‍🟩<br /><br />🍨 직관적인 청량감, 리치소르베<br />🍑 역사적 서사를 담은 프리미엄 디저트, 피치멜바',
    srOnlyDesc:
      '직관적인 청량함을 느끼는 리치향의 리치소르베와 로맨틱한 분위기의 복숭아, 라즈베리 향의 피치멜바로 세상에 없던 새로운 드립백을 만나보세요.',
    to: 'https://kko.to/CC1C1xYfhF',
    innerTo: '/products/bright',
  },
  {
    id: 'decaf',
    badge: '한계를 넘어선 새로운 Decaf',
    name: '뉴드 드립백 디카페인 에디션',
    detailName: '뉴드 드립백 디카페인 에디션 커피',
    accent: 'var(--purple)',
    price: '14,000원',
    description:
      '디카페인의 한계를 넘어선 Chocolate & Tea 라인업 🌿<br /><br />🍫 바쁜 하루 끝 가장 부드러운 한 잔, 피스타치오가나슈<br />🍵 산뜻함 그 이상의 특별함, 애프리콧아뜰리에',
    srOnlyDesc:
      '부드러운 피스타치오, 초콜릿 향의 피스타치오가나슈와 산뜻한 살구, 홍차향의 애프리콧아뜰리에로 세상에 없던 새로운 드립백을 만나보세요.',
    to: 'https://kko.to/CC1C1xYfhF',
    innerTo: '/products/decaf',
  },
]
