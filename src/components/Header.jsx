import { Link, NavLink } from 'react-router-dom'
import txtLogoColor from '../assets/images/txtLogo_color.png'

// 네비게이션 메뉴 정의
// - external: true → 외부 링크(href, 새 탭)  /  아니면 내부 라우트(to)
const menu = [
  { label: '제품', href: 'https://gift.kakao.com/brand/20130', external: true }, // 카카오 선물하기
  { label: '브랜드', to: '/brand' },
  { label: '이벤트', to: '/events' },   // 내용 미정 (스텁 페이지)
]

export default function Header() {
  return (
    <header>
      <div className="topbar">
        {/* 로고 클릭 시 홈으로 이동 */}
        <Link to="/">
          <img className="topbar-logo" src={txtLogoColor} alt="뉴드" />
        </Link>
      </div>
      <nav className="nav">
        {/* 로고: 홈으로 이동. end → 정확히 "/" 일 때만 active */}
        <NavLink to="/" end>뉴드</NavLink>
        {menu.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ) : (
            <NavLink key={item.label} to={item.to}>{item.label}</NavLink>
          )
        )}
      </nav>
    </header>
  )
}
