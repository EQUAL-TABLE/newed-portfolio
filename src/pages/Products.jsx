import ProductSection from '../components/ProductSection'
import Seo from '../components/Seo'
import { seoProductsPage } from '../data/seo'
import IconList from '../components/IconList'


// 제품 목록 페이지 (/products). 홈과 동일한 제품 그리드를 재사용합니다.
export default function Products() {
  return (
    <main className="content">
      <Seo {...seoProductsPage} />
      <IconList />
      <ProductSection />
      <div className="products-blank" style={{ height: '6rem' }}></div>
    </main>
  )
}
