import { products } from '../data/products'
import ProductCard from './ProductCard'
import { trackShopClick } from '../lib/analytics'
import orangeArrow from '../assets/images/orange-arrow.png'

// 제품 그리드 마지막 칸 CTA → 카카오 선물하기 브랜드 페이지
const KAKAO_BRAND_URL = 'https://gift.kakao.com/brand/20130'

export default function ProductSection() {
  return (
    <section id="products">
      <h2 className="section-title">처음이 더 즐거워지는 제품</h2>
      <div className="products">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}

        {/* 마지막 칸: 카카오 브랜드 페이지로 이동(구매의도 전환) */}
        <a
          className="product-more"
          href={KAKAO_BRAND_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShopClick('product_more', KAKAO_BRAND_URL)}
        >
          <img className="product-more-img" src={orangeArrow} alt="" />
          <span className="product-more-text">제품 더 알아보기</span>
        </a>
      </div>
    </section>
  )
}
