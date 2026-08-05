import { useEffect } from 'react'

/**
 * PrivacyPolicy 모달
 *
 * 본 사이트는 로그인·회원가입·결제 기능이 없는 포트폴리오/소개 사이트로,
 * 개인을 직접 식별하는 정보는 수집하지 않으며 GA4의 쿠키 기반 익명 통계정보만 수집합니다.
 * 라우터가 아닌 모달(오버레이) 형태로 열고 닫도록 설계했습니다.
 *
 * 기능: 배경 흐림(blur) / 오버레이 클릭·ESC 로 닫기 / 열려 있는 동안 배경 스크롤 잠금.
 */

// 방침 시행일 (사이트 운영/배포 시점에 맞춰 수정)
const EFFECTIVE_DATE = '2026년 7월 1일'

export default function PrivacyPolicy({ isOpen, onClose }) {
  // 모달이 열려 있는 동안 배경 스크롤을 잠그고, ESC 키로 닫을 수 있게 처리
  useEffect(() => {
    if (!isOpen) return

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    // 어두운 반투명 + 흐림 배경. 배경 클릭 시 닫힘.
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="개인정보 처리방침"
    >
      {/* 본문 카드. 내부 클릭이 배경 닫힘으로 전파되지 않도록 차단. */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* 헤더: 제목 + 닫기 (스크롤 시 고정) */}
        <div className="modal-header">
          <h2 className="modal-title">개인정보 처리방침</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        {/* 본문: 스크롤 영역 */}
        <div className="modal-body">
          <p>
            (주)이퀄테이블(이하 &ldquo;회사&rdquo;)은 「개인정보 보호법」 제30조에 따라
            정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
            있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>
          <p className="modal-muted">
            본 사이트(NEWED 브랜드 소개 페이지)는 회원가입·로그인·결제 기능을 제공하지
            않으며, 이용자를 직접 식별할 수 있는 정보(성명, 연락처, 결제정보 등)를 수집하지
            않습니다. 회사는 웹사이트 이용 행태 분석을 위한 쿠키 기반의 익명 통계정보만을
            자동으로 수집합니다.
          </p>

          <section>
            <h3>제1조 (수집하는 개인정보 항목 및 처리 목적)</h3>
            <p>
              회사는 웹사이트 방문 및 이용 과정에서 아래의 정보가 자동으로 생성·수집될 수
              있습니다.
            </p>
            <ul>
              <li>
                <strong>자동 수집 항목</strong> : 쿠키, IP 주소, 방문 일시 및 체류 시간,
                페이지 조회·이동 기록, 접속 경로, 기기·브라우저 정보(User-Agent)
              </li>
              <li>
                <strong>처리 목적</strong> : 웹사이트 이용 행태 통계 분석을 통한 서비스 및
                콘텐츠 개선
              </li>
            </ul>
            <p className="modal-muted">
              ※ 위 정보는 Google Analytics 4(GA4)를 통해 익명으로 수집되며, 특정 개인을
              식별하는 용도로 이용되지 않습니다.
            </p>
          </section>

          <section>
            <h3>제2조 (개인정보의 보유 및 이용 기간)</h3>
            <p>
              자동 수집된 행태정보는 Google Analytics 4의 기본 설정에 따라 수집으로부터{' '}
              <strong>최대 14개월</strong> 보관 후 자동 삭제됩니다.
            </p>
          </section>

          <section>
            <h3>제3조 (개인정보의 제3자 제공 및 국외 이전)</h3>
            <p>
              회사는 통계 분석을 위해 다음과 같이 개인정보 처리를 외부 서비스에 위탁하며, 이
              과정에서 정보가 국외로 이전될 수 있습니다.
            </p>
            <ul>
              <li>
                <strong>이전받는 자</strong> : Google LLC
              </li>
              <li>
                <strong>이전 국가 및 일시·방법</strong> : 미국 등 Google 데이터센터 / 정보
                수집 시점에 네트워크를 통해 전송
              </li>
              <li>
                <strong>이전 항목</strong> : 제1조의 자동 수집 항목(쿠키 기반 익명 식별자
                포함)
              </li>
              <li>
                <strong>이전받는 자의 이용 목적 및 보유 기간</strong> : 웹사이트 이용 통계
                분석 / 최대 14개월
              </li>
              <li>
                <strong>Google 개인정보처리방침</strong> :{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/privacy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h3>제4조 (쿠키의 설치·운영 및 거부)</h3>
            <p>
              회사는 이용 행태 분석을 위해 &lsquo;쿠키(cookie)&rsquo;를 사용합니다. 쿠키는
              웹사이트 서버가 이용자의 브라우저에 보내는 소량의 정보로, 이용자는 다음의
              방법으로 쿠키 수집을 거부할 수 있습니다.
            </p>
            <ul>
              <li>
                브라우저 설정 변경을 통한 쿠키 저장 거부 (브라우저별 설정 &gt; 개인정보/쿠키
                메뉴)
              </li>
              <li>
                Google Analytics 차단 부가기능 설치 :{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  tools.google.com/dlpage/gaoptout
                </a>
              </li>
            </ul>
            <p className="modal-muted">
              ※ 쿠키 저장을 거부하더라도 본 사이트 콘텐츠 이용에는 제한이 없습니다.
            </p>
          </section>

          <section>
            <h3>제5조 (정보주체의 권리·의무 및 행사 방법)</h3>
            <p>
              정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지를 요구할 수
              있으며, 회사는 관련 법령에 따라 지체 없이 조치합니다. 요청은 아래 제7조의
              개인정보 보호책임자에게 서면, 전화, 전자우편 등을 통해 하실 수 있습니다.
            </p>
          </section>

          <section>
            <h3>제6조 (개인정보의 안전성 확보조치)</h3>
            <p>
              회사는 수집되는 정보가 익명 통계정보임을 전제로, 외부 분석 서비스(GA4)의
              데이터 접근 권한을 최소한의 담당자로 제한하고, 보안 접속(HTTPS)을 통해 정보를
              전송하는 등 안전성 확보에 필요한 조치를 취하고 있습니다.
            </p>
          </section>

          <section>
            <h3>제7조 (개인정보 보호책임자)</h3>
            <p>
              회사는 개인정보 처리에 관한 업무를 총괄하고 정보주체의 문의·불만을 처리하기
              위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <ul>
              <li>성명 : 김희선</li>
              <li>직책 : 매니저</li>
              <li>연락처 : 070-7954-3783</li>
              <li>이메일 : info.equaltable@gmail.com</li>
            </ul>
          </section>

          <section>
            <h3>제8조 (권익침해 구제 방법)</h3>
            <p>
              정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나
              상담을 신청할 수 있습니다.
            </p>
            <ul>
              <li>개인정보 침해신고센터 (한국인터넷진흥원) : 국번 없이 118 / privacy.kisa.or.kr</li>
              <li>개인정보 분쟁조정위원회 : 1833-6972 / www.kopico.go.kr</li>
              <li>대검찰청 사이버수사과 : 국번 없이 1301 / www.spo.go.kr</li>
              <li>경찰청 사이버수사국 : 국번 없이 182 / ecrm.police.go.kr</li>
            </ul>
          </section>

          <section>
            <h3>제9조 (개인정보 처리방침의 시행 및 변경)</h3>
            <p>
              본 개인정보 처리방침은 {EFFECTIVE_DATE}부터 적용됩니다. 법령 및 방침의 변경에
              따라 내용이 추가·삭제·수정될 경우, 변경 사항은 본 페이지를 통해 공지합니다.
            </p>
          </section>

          <p className="modal-note">공고일자 / 시행일자 : {EFFECTIVE_DATE}</p>
        </div>
      </div>
    </div>
  )
}
