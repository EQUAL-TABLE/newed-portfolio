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

import { productsCore } from './productsCore';

const images = {
  deep: {
    thumbImg: deepThumbImg,
    productImg: deepProductImg,
    descripImg1: deepDescripImg1,
    descripImg2: deepDescripImg2,
    descripImg3: deepDescripImg3,
    package: deepPackage,
  },
  bright: {
    thumbImg: brightThumbImg,
    productImg: brightProductImg,
    descripImg1: brightDescripImg1,
    descripImg2: brightDescripImg2,
    descripImg3: brightDescripImg3,
    package: brightPackage,
  },
  decaf: {
    thumbImg: decafThumbImg,
    productImg: decafProductImg,
    descripImg1: decafDescripImg1,
    descripImg2: decafDescripImg2,
    descripImg3: decafDescripImg3,
    package: decafPackage,
  },
};

// 상품 목록 — 텍스트/가격 데이터는 productsCore.js, 이미지는 여기서 합쳐 최종 배열을 만듭니다.
// 상품이 늘어나면 productsCore.js 에 항목을 추가하고 여기 images 에 이미지 세트만 더하면 됩니다.
export const products = productsCore.map((p) => ({ ...p, ...images[p.id] }));
