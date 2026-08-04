import ProductSection from '../components/ProductSection'
import Seo from '../components/Seo'
import { seoProductsPage } from '../data/seo'

// 제품 목록 페이지 (/products). 홈과 동일한 제품 그리드를 재사용합니다.
export default function Products() {
  return (
    <main className="content">
      <Seo {...seoProductsPage} />
      <ProductSection />
    </main>
  )
}
