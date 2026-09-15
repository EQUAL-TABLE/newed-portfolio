import ProductSection from '../components/ProductSection'
import Seo from '../components/Seo'
import { seoProductsPage } from '../data/seo'
import IconList from '../components/IconList'


// 제품 목록 페이지 (/products). 홈과 동일한 제품 그리드를 재사용합니다.
export default function Products() {
  return (
    <main className="content">
      <Seo {...seoProductsPage} />
      <h1 className="sr-only">뉴드 드립백 커피 3종 세트 — 뻔한 선물 말고 받는 순간 기분이 좋아지는 유니크한 선물을 하세요.</h1>
      <p className='sr-only'>누구나 좋아하는 호불호 없는 딥 에디션으로 모두가 좋아하는 생일선물
        & 싱그러운 과일향의 브라이트 에디션으로 일상의 기분을 전환시키는 가벼운 선물
        & 한계를 넘어선 디카페인 에디션으로 1만원대 부담없는 집들이 선물까지</p>
      <IconList />
      <ProductSection />
      <div className="products-blank" style={{ height: '6rem' }}></div>
    </main>
  )
}
