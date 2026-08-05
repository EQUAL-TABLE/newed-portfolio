import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Brand from './pages/Brand'
import Events from './pages/Events'
import NotFound from './pages/NotFound'
import { trackPageView } from './lib/analytics'

export default function App() {
  // SPA 라우트 변경마다 GA4 page_view 전송 (initGA 에서 자동 page_view 는 꺼둠)
  const location = useLocation()
  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location.pathname, location.search])

  return (
    <Routes>
      {/* 공통 레이아웃(Header/Footer) 아래에 각 페이지가 들어갑니다 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* 제품 목록 페이지 */}
        <Route path="/products" element={<Products />} />
        {/* 제품 상세는 카드/목록에서 진입 (/products/deep 등) */}
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/events" element={<Events />} />
        {/* 그 외 알 수 없는 경로 → 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
