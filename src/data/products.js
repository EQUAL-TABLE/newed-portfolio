// deep 이미지 =================
import deepThumbImg from '../assets/images/deep-thumbImg-300-300.png';
import deepProductImg from '../assets/images/deep-productImg-656-656.png';
import deepDescripImg1 from '../assets/images/deep-productDetail-1.png';
import deepDescripImg2 from '../assets/images/deep-productDetail-2.png';
import deepDescripImg3 from '../assets/images/deep-productDetail-3.png';
import deepPackage from '../assets/images/deep_package.webp';

// bright 이미지 =================
import brightThumbImg from '../assets/images/bright-thumbImg-300-300.png';
import brightProductImg from '../assets/images/bright-productImg-656-656.png';
import brightDescripImg1 from '../assets/images/bright-productDetail-1.png';
import brightDescripImg2 from '../assets/images/bright-productDetail-2.png';
import brightDescripImg3 from '../assets/images/bright-productDetail-3.png';
import brightPackage from '../assets/images/bright_package.webp';

// decaf 이미지 =================
import decafThumbImg from '../assets/images/decaf-thumbImg-300-300.png';
import decafProductImg from '../assets/images/decaf-productImg-656-656.png';
import decafDescripImg1 from '../assets/images/decaf-productDetail-1.png';
import decafDescripImg2 from '../assets/images/decaf-productDetail-2.png';
import decafDescripImg3 from '../assets/images/decaf-productDetail-3.png';
import decafPackage from '../assets/images/decaf_package.webp';

// 상품 목록 — 상품이 늘어나면 이 배열에 항목만 추가하면 됩니다.
export const products = [
  { id: 'deep',
    badge: '누구나 사랑하는 Sweet & Nutty',
    name: '뉴드 드립백 딥 에디션',
    accent: 'var(--orange)',   // 제품명 뒷부분(에디션명) 강조색
    price: '14,000원',
    thumbImg: deepThumbImg,
    productImg: deepProductImg,
    description: '검증된 조합의 현대적 재해석, 오랑주쇼콜라 <br />오래 사랑받는 조합엔 다 이유가 있지. 첫 입에 알 수 있어.<br />짙은 다크초콜릿이 만든 무드 위로 번지는 오렌지의 산뜻한 킥<br />모두가 고객를 끄덕이는 클래식한 위트, 빠지는 건 한순간이야',
    descripImg1: deepDescripImg1,
    descripImg2: deepDescripImg2,
    descripImg3: deepDescripImg3,
    to: 'https://gift.kakao.com/brand/20130',
    innerTo: '/products/deep',
    package: deepPackage,
  },
  { id: 'bright',
    badge: '싱그러운 과일 산미의 Fruity',
    name: '뉴드 드립백 브라이트 에디션',
    accent: 'var(--blue)',   // 제품명 뒷부분(에디션명) 강조색
    price: '14,000원',
    thumbImg: brightThumbImg,
    productImg: brightProductImg,
    description: '싱그러운 과일 산미의 Fruity<br />새로운 맛의 모험, 풍부한 과일 향기와 상큼한 산미가 어우러진다.<br />산뜻한 킥과 부드러운 후맛, 한 번 먹으면 끝나지 않는 맛의 여정',
    descripImg1: brightDescripImg1,
    descripImg2: brightDescripImg2,
    descripImg3: brightDescripImg3,
    to: 'https://gift.kakao.com/brand/20131',
    innerTo: '/products/bright',
    package: brightPackage,
  },
  { id: 'decaf',
    badge: '한계를 넘어선 새로운 Decaf',
    name: '뉴드 드립백 디카페인 에디션',
    accent: 'var(--purple)',   // 제품명 뒷부분(에디션명) 강조색
    price: '14,000원',
    thumbImg: decafThumbImg,
    productImg: decafProductImg,
    description: '한계를 넘어선 새로운 Decaf<br />깊은 풍미와 부드러운 맛, 디카페인으로도 풍성한 경험을.<br />산뜻한 킥과 부드러운 후맛, 한 번 먹으면 끝나지 않는 맛의 여정',
    descripImg1: decafDescripImg1,
    descripImg2: decafDescripImg2,
    descripImg3: decafDescripImg3,
    to: 'https://gift.kakao.com/brand/20132',
    innerTo: '/products/decaf',
    package: decafPackage,
  },
]
