import { InstaFeedsInfo } from '../data/InstaFeeds'

export default function InstaGrids() {
  return (
    <section>
      <h2 className="section-title">뉴드와 함께하는 새로운 시작</h2>
      <div className="grid">
        {InstaFeedsInfo.map((item) => (
          <div key={item.id} className="box">{item.label}</div>
        ))}
      </div>
    </section>
  )
}
