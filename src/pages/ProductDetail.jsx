import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import '../css/productDetail.css'

// 제품 상세 페이지. URL 의 :id 로 상품을 특정합니다.
// 구성: 메인이미지 → 제품명 → 설명 → 가격 → 상세이미지
export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <main className="content notfound">
        <h2 className="section-title">상품을 찾을 수 없습니다.</h2>
        <Link to="/">홈으로 돌아가기</Link>
      </main>
    )
  }

  // description 안의 <br> / </br> 를 실제 줄바꿈으로 렌더링
  const lines = product.description.split(/<\/?br\s*\/?>/i)

  return (
    <main className="pd">
      {/* 메인 이미지 */}
      <img className="pd-main" src={product.productImg} alt={product.name} />

      <div className="pd-info">
        {/* 제품명 */}
        <h1 className="pd-name">{product.name}</h1>

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
        src={product.descripImg}
        alt={`${product.name} 상세 이미지`}
      />

      {/* 하단 고정 구매 버튼 — product.to 로 새 탭 이동 */}
      <div className="pd-buybar">
        <a
          className="pd-buy"
          href={product.to}
          target="_blank"
          rel="noopener noreferrer"
        >
          바로 구매
        </a>
      </div>
    </main>
  )
}
