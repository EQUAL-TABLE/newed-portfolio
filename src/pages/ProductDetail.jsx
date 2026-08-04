import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import Seo from '../components/Seo'
import { seoProducts } from '../data/seo'
import { trackShopClick } from '../lib/analytics'
import '../css/productDetail.css'

// 제품 상세 페이지. URL 의 :id 로 상품을 특정합니다.
// 구성: 메인이미지 → 제품명 → 설명 → 가격 → 상세이미지
export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)

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

      {/* 하단 고정 구매 버튼 — product.to 로 새 탭 이동 */}
      <div className="pd-buybar">
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
