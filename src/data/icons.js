import deep_package from '../assets/images/deep_package.webp'
import bright_package from '../assets/images/bright_package.webp'
import decaf_package from '../assets/images/decaf_package.webp'

// 아이콘(카테고리) 목록 — 항목만 추가/수정하면 화면에 반영됩니다.
// kind: 추적 분류 — 'best'(내부) / 'shop'(카카오 전환) / 'instagram'(문의 전환)
export const icons = [
  { id: 'icon-1', description: '베스트', img: deep_package, to:"/products/deep", kind: 'best' },
  { id: 'icon-2', description: '카카오선물하기', img: bright_package, to:"https://kko.to/Z9DxAN9Lik", kind: 'shop' },
  { id: 'icon-3', description: '인스타그램', img: decaf_package, to:"https://www.instagram.com/newed_official/", kind: 'instagram' },
]
