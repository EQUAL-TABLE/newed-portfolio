import { useState } from 'react'
import { Link } from 'react-router-dom'
import PrivacyPolicy from './PrivacyPolicy'
import {
  trackMenuClick,
  trackAccordionToggle,
  trackInstagramClick,
  trackModalOpen,
} from '../lib/analytics'

export default function Footer() {
  const [bizOpen, setBizOpen] = useState(false)      // 사업자정보 아코디언
  const [privacyOpen, setPrivacyOpen] = useState(false) // 개인정보처리방침 모달

  return (
    <footer className="footer" id="footer">
      <p className="footer-copy">©NEWED.ALL RIGHTSRESERVED</p>

      <nav className="footer-menu">
        {/* 브랜드소개 → 브랜드 페이지 이동 */}
        <Link to="/brand" onClick={() => trackMenuClick('brand', 'footer')}>브랜드소개</Link>
        <span className="footer-divider">｜</span>
        {/* 사업자정보 → 아코디언 토글 */}
        <button
          type="button"
          className="footer-link"
          onClick={() => {
            const next = !bizOpen
            trackAccordionToggle('business_info', next)
            setBizOpen(next)
          }}
          aria-expanded={bizOpen}
        >
          사업자정보
        </button>
        <span className="footer-divider">｜</span>
        {/* 인스타그램 → 외부 링크(새 탭) = 문의 전환 */}
        <a
          href="https://www.instagram.com/newed_official/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackInstagramClick('footer', 'https://www.instagram.com/newed_official/')
          }
        >
          인스타그램
        </a>
        <span className="footer-divider">｜</span>
        {/* 개인정보처리방침 → 모달 */}
        <button
          type="button"
          className="footer-link"
          onClick={() => {
            trackModalOpen('privacy')
            setPrivacyOpen(true)
          }}
        >
          개인정보처리방침
        </button>
      </nav>

      {/* 사업자정보 아코디언 영역 */}
      <div className={`footer-biz ${bizOpen ? 'open' : ''}`}>
        <div className="footer-biz-inner">
          <p>법인명(상호) : 주식회사 이퀄테이블 ｜ 대표자 : 문준석</p>
          <p>주소 : 서울특별시 중랑구 신내역로 1길 40-36 B1209호 (신내동)</p>
          <p>전화 : 070-7954-3783 ｜ 사업자등록번호 : 564-87-02196</p>
        </div>
      </div>

      <p className="footer-contact">
        기타 협업 관련 문의는{' '}
        <a href="mailto:info.equaltable@gmail.com">info.equaltable@gmail.com</a>{' '}
         로 문의바랍니다.
      </p>

      <PrivacyPolicy isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  )
}
