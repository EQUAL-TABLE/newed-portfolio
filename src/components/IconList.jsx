import { icons } from '../data/icons'
import { trackShopClick, trackInstagramClick, trackIconClick } from '../lib/analytics'

// 아이콘 kind 별 추적: shop(카카오 전환) / instagram(문의 전환) / best(내부)
function trackIcon(icon) {
  if (icon.kind === 'shop') trackShopClick('icon', icon.to)
  else if (icon.kind === 'instagram') trackInstagramClick('icon', icon.to)
  else trackIconClick(icon.kind || icon.description)
}

export default function IconList() {
  return (
    <div className="icons" id="icons">
      {icons.map((icon) => (
        <button
          type="button"
          key={icon.id}
          className="icon-item"
          onClick={() => {
            trackIcon(icon)
            window.open(icon.to, '_blank')
          }}
        >
          <div className="icon-circle">
            <img className="icon-img" src={icon.img} alt={icon.description} />
          </div>
          <span className="iconDescription">{icon.description}</span>
        </button>
      ))}
    </div>
  )
}
