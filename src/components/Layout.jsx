import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// 모든 페이지가 공유하는 레이아웃. <Outlet /> 자리에 현재 경로의 페이지가 렌더링됩니다.
export default function Layout() {
  return (
    <div className="page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
