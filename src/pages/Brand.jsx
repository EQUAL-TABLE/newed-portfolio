import '../css/brand.css'

// 브랜드 소개 페이지
export default function Brand() {
  return (
    <main className="brand">
      {/* 최상단 이미지: 좌우 여백 없이 꽉 참 */}
      <img
        className="brand-hero"
        src="https://placehold.co/656x656/468fcd/FFFFFF/png"
        alt="브랜드 대표 이미지"
      />

      <section className="brand-section">
        <h2 className="brand-en">VIVID PLEASURE</h2>
        <h3 className="brand-ko">선명하게 느껴지는 즐거움</h3>
        <p className="brand-desc">
          프랑스에 커피가 처음 닿은 도시, 마르세유 <br />
          우리는 마르세유 커피하우스가 처음 깨운 선명한 감각과<br />
          그 새로움을 있는 그대로 즐기던 마르세요 사람들의 자유로운 직관에서 영감을 받았습니다.<br />
          그 시절의 낭만을 현대적으로 재해석해 고객들에게 선명한 즐거움을 선사합니다.
        </p>
      </section>

      {/* 이후 이미지: 좌우 여백 약간 */}
      <img
        className="brand-img"
        src="https://placehold.co/656x200/468fcd/FFFFFF/png"
        alt=""
      />

      <section className="brand-section">
        <h2 className="brand-en">NO OVERTHINKING, JUST TASTE</h2>
        <h3 className="brand-ko">마시는 순간 '맛있다'는 감탄사가 나오는 맛</h3>
        <p className="brand-desc">
          산지, 고도, 테이스팅 노트... 그런거 몰라도 돼<br />
          한 모금 마셨을 때, 이거다 싶으면 충분하잖아<br />
          뉴드는 그 첫 감각을 믿어. 복잡한 말 대신, 입안에 퍼지는 선명한 즐거움<br />
          한 잔으로 행복해지는 순간, 뉴드
        </p>
      </section>

      <img
        className="brand-img"
        src="https://placehold.co/656x200/468fcd/FFFFFF/png"
        alt=""
      />

      <section className="brand-section">
        <h2 className="brand-en">FIRST SIP, THAT FEELING</h2>
        <h3 className="brand-ko">지금 이 순간, 이끌리는 대로 즐겨</h3>
        <p className="brand-desc">
          애써 고민하지 않아도 돼<br />
          코 끝에 닿는 향, 입안에 차오르는 맛<br />
          그 느낌이면 충분해. 뉴드는 네 직감을 의심하지 않아<br />
          지금 이 순간, 이끌리는 대로 즐겨
        </p>
      </section>
    </main>
  )
}
