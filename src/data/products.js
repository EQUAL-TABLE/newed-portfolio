// deep 이미지 =================
import deepThumbImg from '../assets/images/deep-thumbImg-300-300.png';
import deepProductImg from '../assets/images/deep-productImg-656-656.png';
import deepDescripImg1 from '../assets/images/deep-productDetail-1.webp';
import deepDescripImg2 from '../assets/images/deep-productDetail-2.webp';
import deepDescripImg3 from '../assets/images/deep-productDetail-3.webp';
import deepPackage from '../assets/images/deep_package.webp';

// bright 이미지 =================
import brightThumbImg from '../assets/images/bright-thumbImg-300-300.png';
import brightProductImg from '../assets/images/bright-productImg-656-656.png';
import brightDescripImg1 from '../assets/images/bright-productDetail-1.webp';
import brightDescripImg2 from '../assets/images/bright-productDetail-2.webp';
import brightDescripImg3 from '../assets/images/bright-productDetail-3.webp';
import brightPackage from '../assets/images/bright_package.webp';

// decaf 이미지 =================
import decafThumbImg from '../assets/images/decaf-thumbImg-300-300.png';
import decafProductImg from '../assets/images/decaf-productImg-656-656.png';
import decafDescripImg1 from '../assets/images/decaf-productDetail-1.webp';
import decafDescripImg2 from '../assets/images/decaf-productDetail-2.webp';
import decafDescripImg3 from '../assets/images/decaf-productDetail-3.webp';
import decafPackage from '../assets/images/decaf_package.webp';

// 상품 목록 — 상품이 늘어나면 이 배열에 항목만 추가하면 됩니다.
export const products = [
  { id: 'deep',
    badge: '누구나 사랑하는 Sweet & Nutty',
    name: '뉴드 드립백 딥 에디션',
    detailName: '뉴드 드립백 딥 에디션 커피',
    accent: 'var(--orange)',   // 제품명 뒷부분(에디션명) 강조색
    price: '14,000원',
    thumbImg: deepThumbImg,
    productImg: deepProductImg,
    description: '누구나 사랑하는 Sweet & Nutty의 풍미를 담아<br />고민 없이 선택할 수 있는 라인업 🍫<br /><br />🍊 검증된 조합의 현대적 재해석, 오랑주쇼콜라<br />🍪 아는 맛이 무서운 , 크리미넛',
    srOnlyDesc: '누구에게나 사랑받는 오렌지, 초콜릿 향의 오랑주 쇼콜라와 익숙하면서 중독적인 버터 쿠키 향의 크리미넛으로 세상에 없던 새로운 드립백을 만나보세요.',
    descripImg1: deepDescripImg1,
    descripImg2: deepDescripImg2,
    descripImg3: deepDescripImg3,
    to: 'https://kko.to/CC1C1xYfhF',
    innerTo: '/products/deep',
    package: deepPackage,
  },
  { id: 'bright',
    badge: '싱그러운 과일 향의 Fruity',
    name: '뉴드 드립백 브라이트 에디션',
    detailName: '뉴드 드립백 브라이트 에디션 커피',
    accent: 'var(--blue)',   // 제품명 뒷부분(에디션명) 강조색
    price: '14,000원',
    thumbImg: brightThumbImg,
    productImg: brightProductImg,
    description: '싱그러운 과일의 향을 극대화한 Fruity & Rich 라인업 🍋‍🟩<br /><br />🍨 직관적인 청량감, 리치소르베<br />🍑 역사적 서사를 담은 프리미엄 디저트, 피치멜바',
    srOnlyDesc: '직관적인 청량함을 느끼는 리치향의 리치소르베와 로맨틱한 분위기의 복숭아,라즈베리 향의 피치멜바로 세상에 없던 새로운 드립백을 만나보세요.',
    descripImg1: brightDescripImg1,
    descripImg2: brightDescripImg2,
    descripImg3: brightDescripImg3,
    to: 'https://kko.to/CC1C1xYfhF',
    innerTo: '/products/bright',
    package: brightPackage,
  },
  { id: 'decaf',
    badge: '한계를 넘어선 새로운 Decaf',
    name: '뉴드 드립백 디카페인 에디션',
    detailName: '뉴드 드립백 디카페인 에디션 커피',
    accent: 'var(--purple)',   // 제품명 뒷부분(에디션명) 강조색
    price: '14,000원',
    thumbImg: decafThumbImg,
    productImg: decafProductImg,
    description: '디카페인의 한계를 넘어선 Chocolate & Tea 라인업 🌿<br /><br />🍫 바쁜 하루 끝 가장 부드러운 한 잔, 피스타치오가나슈<br />🍵 산뜻함 그 이상의 특별함, 애프리콧아뜰리에',
    srOnlyDesc: '부드러운 피스타치오, 초콜릿 향의 피스타치오가나슈와 산뜻한 살구, 홍차향의 애프리콧아뜰리에로 세상에 없던 새로운 드립백을 만나보세요.',
    descripImg1: decafDescripImg1,
    descripImg2: decafDescripImg2,
    descripImg3: decafDescripImg3,
    to: 'https://kko.to/CC1C1xYfhF',
    innerTo: '/products/decaf',
    package: decafPackage,
  },
]
