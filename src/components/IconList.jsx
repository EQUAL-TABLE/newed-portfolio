import { icons } from '../data/icons'

export default function IconList() {
  return (
    <div className="icons">
      {icons.map((icon) => (
        // 추후 클릭 시 페이지 이동 예정. 지금은 onClick 없이 두어 클릭해도 제자리.
        <button type="button" key={icon.id} className="icon-item" onClick={() => window.open(icon.to, '_blank')}>
          <div className="icon-circle">
            <img className="icon-img" src={icon.img} alt={icon.description} />
          </div>
          <span className="iconDescription">{icon.description}</span>
        </button>
      ))}
    </div>
  )
}
