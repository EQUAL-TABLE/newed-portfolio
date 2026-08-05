import { useEffect, useRef, useState } from 'react'
import banner1 from '../assets/images/banner-1-615-210.png'
import banner2 from '../assets/images/banner-2-615-210.png'
import banner3 from '../assets/images/banner-3-615-210.png'

// 프로모션 배너 캐러셀 — 화살표 없이 드래그/스와이프로 넘기고, 하단 점으로 현재 위치 표시.
const banners = [banner1, banner2, banner3]

// id: 섹션 추적(useSectionTracking)용 앵커
export default function Banner({ id }) {
  const [index, setIndex] = useState(0)     // 현재 배너 인덱스 (0 ~ len-1)
  const [dragPx, setDragPx] = useState(0)    // 드래그 중 이동량(px)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const viewportRef = useRef(null)

  // 5초마다 다음 배너로 자동 넘김 (마지막 → 처음 순환).
  // index 가 바뀔 때마다(수동 조작 포함) 타이머 리셋, 드래그 중에는 멈춤.
  useEffect(() => {
    if (dragging) return
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % banners.length)
    }, 5000)
    return () => clearTimeout(timer)
  }, [index, dragging])

  const onPointerDown = (e) => {
    setDragging(true)
    startX.current = e.clientX
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (dragging) setDragPx(e.clientX - startX.current)
  }
  const onPointerUp = () => {
    if (!dragging) return
    const width = viewportRef.current?.offsetWidth ?? 1
    const threshold = width * 0.2   // 20% 이상 끌면 넘김
    if (dragPx > threshold) setIndex((i) => Math.max(0, i - 1))
    else if (dragPx < -threshold) setIndex((i) => Math.min(banners.length - 1, i + 1))
    setDragPx(0)
    setDragging(false)
  }

  return (
    <div className="banner-carousel" id={id}>
      <div
        className="banner-viewport"
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="banner-track"
          style={{
            transform: `translateX(calc(${-index * 100}% + ${dragPx}px))`,
            transition: dragging ? 'none' : 'transform 0.4s ease',
          }}
        >
          {banners.map((img, i) => (
            <div className="banner-slide" key={i}>
              <img src={img} alt={`프로모션 배너 ${i + 1}`} draggable="false" />
            </div>
          ))}
        </div>
      </div>

      {/* 하단 점 인디케이터 — 활성=흰 원, 비활성=반투명 원. 화살표는 두지 않음 */}
      <div className="banner-dots">
        {banners.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`banner-dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`${i + 1}번 배너로 이동`}
          />
        ))}
      </div>
    </div>
  )
}
