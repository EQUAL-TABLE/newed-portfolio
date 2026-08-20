import { Link, NavLink } from 'react-router-dom'
import txtLogoColor from '../assets/images/txtLogo_color.png'
import { trackMenuClick, trackShopClick, trackInstagramClick } from '../lib/analytics'

// 네비게이션 메뉴 정의
// - external: true → 외부 링크(href, 새 탭)  /  아니면 내부 라우트(to)
// - kind: 외부 링크 추적 분류 — 'shop'(카카오 전환) / 'instagram'(문의 전환)
const menu = [
  { label: '브랜드', to: '/brand', menuName: 'brand' },
  { label: '제품', to: '/products', menuName: 'product' }, // 제품 목록 페이지(내부)
  { label: '이벤트', href: 'https://www.instagram.com/p/DcPkPX7Jssf/', external: true, kind: 'instagram' }, // 인스타그램
]

// 외부 메뉴 클릭 추적: shop → 구매의도 전환 / instagram → 문의 전환
function trackExternalMenu(item) {
  if (item.kind === 'shop') trackShopClick('menu', item.href)
  else if (item.kind === 'instagram') trackInstagramClick('header', item.href)
}

export default function Header() {
  return (
    <header>
      <div className="topbar">
        {/* 로고 클릭 시 홈으로 이동 */}
        <Link to="/" onClick={() => trackMenuClick('logo', 'header')}>
          <img className="topbar-logo" src={txtLogoColor} alt="뉴드" />
        </Link>
      </div>
      <nav className="nav">
        {/* 로고: 홈으로 이동. end → 정확히 "/" 일 때만 active */}
        <NavLink to="/" end onClick={() => trackMenuClick('home', 'header')}>뉴드</NavLink>
        {menu.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackExternalMenu(item)}
            >
              {item.label}
            </a>
          ) : (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => trackMenuClick(item.menuName, 'header')}
            >
              {item.label}
            </NavLink>
          )
        )}
      </nav>
    </header>
  )
}
