import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Brand from './pages/Brand'
import Events from './pages/Events'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* 공통 레이아웃(Header/Footer) 아래에 각 페이지가 들어갑니다 */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* 제품 목록 페이지는 운영하지 않음 → /products 접근 시 홈으로 리다이렉트 */}
        <Route path="/products" element={<Navigate to="/" replace />} />
        {/* 제품 상세는 홈의 카드에서 진입 (/products/deep 등) */}
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/events" element={<Events />} />
        {/* 그 외 알 수 없는 경로 → 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
