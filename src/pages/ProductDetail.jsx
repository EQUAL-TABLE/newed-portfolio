import { useEffect, useRef, useState } from 'react'
 import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import Seo from '../components/Seo'
import { seoProducts } from '../data/seo'
import { trackShopClick, trackContentView, trackProductClick } from '../lib/analytics'
import '../css/productDetail.css'

// 제품 상세 페이지. URL 의 :id 로 상품을 특정합니다.
// 구성: 메인이미지 → 제품명 → 설명 → 가격 → 상세이미지
export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const buybarRef = useRef(null)
  const detailRef = useRef(null)
  const [showTop, setShowTop] = useState(false)   // 맨 위로 버튼 노출 여부

  // 다른 제품으로 전환되면(id 변경) 스크롤을 최상단으로 되돌린다.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // 상품 상세 도달 = 콘텐츠조회(ViewContent) 1회. 진입 경로(카드/히어로/관련링크/직접 URL) 무관.
  useEffect(() => {
    if (product) trackContentView(product.name, 'detail', product.id)
  }, [product])

  // 상세 이미지가 화면에 들어오기 시작하면 '맨 위로' 버튼을 노출한다.
  // (스크롤 최상단에서는 숨김 → 상세 이미지 top 이 뷰포트 안에 들어온 순간부터 표시)
  useEffect(() => {
    const el = detailRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setShowTop(el.getBoundingClientRect().top < window.innerHeight)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [product])

  // 고정 구매 버튼바의 실제 높이만큼 푸터 하단에 여백을 확보한다.
  // (버튼 글자가 px 고정이라 화면 폭에 따라 rem 여백과 비율이 어긋나므로,
  //  고정값 대신 실제 높이를 측정해 CSS 변수 --pd-buybar-h 로 전달)
  useEffect(() => {
    const el = buybarRef.current
    if (!el) return
    const root = document.documentElement
    const update = () => root.style.setProperty('--pd-buybar-h', `${el.offsetHeight}px`)
    update()
    const ro = new ResizeObserver(update)   // 폰트 로드·리사이즈로 높이가 바뀌어도 추종
    ro.observe(el)
    return () => {
      ro.disconnect()
      root.style.removeProperty('--pd-buybar-h')   // 다른 페이지에 잔여값 남지 않도록 정리
    }
  }, [product])

  if (!product) {
    return (
      <main className="content notfound">
        <Seo
          path={`/products/${id}`}
          title="상품을 찾을 수 없습니다 — 뉴드 NEWED"
          description="요청하신 상품을 찾을 수 없습니다."
          noindex
        />
        <h2 className="section-title">상품을 찾을 수 없습니다.</h2>
        <Link to="/">홈으로 돌아가기</Link>
      </main>
    )
  }

  // 경로별 SEO 문구: seo.js 에 정의돼 있으면 사용, 없으면 상품 데이터로 자동 생성
  const seo = seoProducts[product.id] ?? {
    title: `${product.name} — ${product.badge} | 뉴드 NEWED`,
    description: product.description.replace(/<\/?br\s*\/?>/gi, ' ').trim(),
  }

  // description 안의 <br> / </br> 를 실제 줄바꿈으로 렌더링
  const lines = product.description.split(/<\/?br\s*\/?>/i)

  // 제품명: 앞 두 단어(뉴드 드립백)는 기본색, 뒤 나머지(에디션명)는 제품별 강조색
  const nameWords = product.name.split(/\s+/)
  const nameHead = nameWords.slice(0, 2).join(' ')
  const nameAccent = nameWords.slice(2).join(' ')

  // '제품 더 알아보기' — 현재 제품을 제외한 나머지 제품
  const others = products.filter((p) => p.id !== product.id)

  return (
    <main className="pd">
      <Seo path={`/products/${product.id}`} title={seo.title} description={seo.description} />

      {/* 메인 이미지 */}
      <img className="pd-main" src={product.productImg} alt={product.name} />

      <div className="pd-info">
        {/* 제품명 — 앞 두 단어는 기본색, 뒤 에디션명은 제품별 강조색 */}
        <h1 className="pd-name">
          {nameHead}
          {nameAccent && (
            <>
              {' '}
              <span style={{ color: product.accent }}>{nameAccent}</span>
            </>
          )}
        </h1>

        {/* 설명 */}
        <p className="pd-desc">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </p>

        {/* 가격 */}
        <p className="pd-price">{product.price}</p>
      </div>

      {/* 제품 상세 이미지 */}
      <img
        ref={detailRef}
        className="pd-detail"
        src={product.descripImg1}
        alt={`${product.name} 상세 이미지`}
      />
            <img
        className="pd-detail"
        src={product.descripImg2}
        alt={`${product.name} 상세 이미지`}
      />
            <img
        className="pd-detail"
        src={product.descripImg3}
        alt={`${product.name} 상세 이미지`}
      />

      {/* 제품 더 알아보기 — 현재 제품 외 나머지 제품(패키지 이미지 + 제품명) */}
      <section className="pd-more">
        <h2 className="pd-more-title">제품 더 알아보기</h2>
        <div className="pd-more-list">
          {others.map((p, i) => (
            <Link
              key={p.id}
              className="pd-more-item"
              to={p.innerTo}
              onClick={() => trackProductClick(p.name, p.id, i)}
            >
              <img className="pd-more-img" src={p.package} alt={p.name} />
              <span className="pd-more-name">{p.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 맨 위로 버튼 — 상세 이미지가 보이기 시작하면 노출, 구매 버튼바 위에 위치 */}
      <button
        type="button"
        className={`pd-top ${showTop ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="맨 위로"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 19V5M12 5l-6 6M12 5l6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* 하단 고정 구매 버튼 — product.to 로 새 탭 이동 */}
      <div className="pd-buybar" ref={buybarRef}>
        <a
          className="pd-buy"
          href={product.to}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShopClick(`buybutton_${product.id}`, product.to, product.id)}
        >
          바로 구매
        </a>
      </div>
    </main>
  )
}
