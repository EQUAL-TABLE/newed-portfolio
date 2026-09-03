import { useEffect } from 'react'
import '../css/return-policy.css'
import Seo from '../components/Seo'
import { seoReturnPolicy } from '../data/seo'
import { trackContentView } from '../lib/analytics'

// 반품·환불 정책 페이지
export default function ReturnPolicy() {
  // 페이지 진입 = 콘텐츠조회 전환 (Meta ViewContent / Naver view_content)
  useEffect(() => {
    trackContentView('반품·환불 정책', 'page')
  }, [])

  return (
    <main className="content return-policy">
      <Seo {...seoReturnPolicy} />

      <h2 className="section-title">환불</h2>

      <ul className="return-list">
        <li>다음과 같이 개인 기호(향·맛), 주문 착오, 단순변심에 인한 교환 및 반품이 불가합니다.</li>
        <li>개봉 및 포장 훼손의 경우, 상품 사용 및 상품의 가치가 감소한 경우</li>
        <li>소비자 보호에 관한 법률이 정하는 소비자 청약 철회 제한에 해당하는 경우</li>
        <li>
          상품에 문제가 있는 경우, 교환·반품 사유가 확인 가능한 사진과 함께 7일 이내{' '}
          <a href="mailto:info.equaltable@gmail.com">info.equaltable@gmail.com</a>으로 문의바랍니다.
        </li>
      </ul>

      <div className="return-contact">
        <p>배송·교환·반품 문의 : 070-7954-3783</p>
        <p>(평일 10~18시/토·일·공휴일 제외)</p>
      </div>
    </main>
  )
}
