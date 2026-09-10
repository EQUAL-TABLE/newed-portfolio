import ProductSection from '../components/ProductSection'
import Seo from '../components/Seo'
import { seoProductsPage } from '../data/seo'
import IconList from '../components/IconList'


// 제품 목록 페이지 (/products). 홈과 동일한 제품 그리드를 재사용합니다.
export default function Products() {
  return (
    <main className="content">
      <Seo {...seoProductsPage} />
      {/* 페이지 대표 제목(h1) — 디자인상 노출되는 제목이 없어 .sr-only 로 시각적으로만 숨김 */}
      <h1 className="sr-only">뉴드 드립백 커피 추천 — 딥 에디션·브라이트 에디션·디카페인 에디션</h1>
      <IconList />
      <ProductSection />
      <div className="products-blank" style={{ height: '6rem' }}></div>
    </main>
  )
}
