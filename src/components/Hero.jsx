import { useEffect, useRef, useState } from 'react'
import { heroSlides } from '../data/heroSlides'
import { trackHeroSlide } from '../lib/analytics'

const len = heroSlides.length
// 무한 루프용: 앞뒤에 클론을 붙임 → [마지막, s0, s1, s2, 첫번째]
const slides = [heroSlides[len - 1], ...heroSlides, heroSlides[0]]

export default function Hero() {
  const [pos, setPos] = useState(1)          // 확장 배열 기준 위치 (1 = 실제 첫 슬라이드)
  const [dragPx, setDragPx] = useState(0)    // 드래그 중 이동량(px)
  const [dragging, setDragging] = useState(false)
  const [noAnim, setNoAnim] = useState(false) // 순간이동(클론→실제) 시 애니메이션 끔
  const startX = useRef(0)
  const viewportRef = useRef(null)

  const logical = (pos - 1 + len) % len       // 오버레이 텍스트용 실제 인덱스

  // 수동 전환(화살표/스와이프)만 추적. 자동재생 타이머는 setPos 를 직접 호출해 추적 제외.
  const goPrev = () => { trackHeroSlide('prev', logical); setNoAnim(false); setPos((p) => p - 1) }
  const goNext = () => { trackHeroSlide('next', logical); setNoAnim(false); setPos((p) => p + 1) }

  // 슬라이드 전환이 끝나면, 클론 위치일 경우 실제 위치로 순간이동
  const onTransitionEnd = () => {
    if (pos === len + 1) { setNoAnim(true); setPos(1) }        // 끝 클론(첫) → 실제 첫
    else if (pos === 0) { setNoAnim(true); setPos(len) }       // 앞 클론(마지막) → 실제 마지막
  }

  const onPointerDown = (e) => {
    setDragging(true)
    setNoAnim(false)
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
    if (dragPx > threshold) goPrev()
    else if (dragPx < -threshold) goNext()
    setDragPx(0)
    setDragging(false)
  }

  // 5초마다 자동으로 다음 슬라이드. 
  // pos 가 바뀔 때마다(수동 조작 포함) 타이머 리셋,
  // 드래그 중에는 멈춤.
  useEffect(() => {
    if (dragging) return
    const timer = setTimeout(() => {
      setNoAnim(false)
      setPos((p) => p + 1)
    }, 5000)
    return () => clearTimeout(timer)
  }, [pos, dragging])

  return (
    <div className="hero" id="hero">
      <div
        className="hero-viewport"
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="hero-track"
          style={{
            transform: `translateX(calc(${-pos * 100}% + ${dragPx}px))`,
            transition: dragging || noAnim ? 'none' : 'transform 0.5s ease',
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((slide, i) => (
            <div className="hero-slide" key={i}>
              <img
                className="hero-img"
                src={slide.img}
                alt={slide.en}
                draggable="false"
              />
            </div>
          ))}
        </div>

        {/* 그림자 + 텍스트 오버레이 — logical 이 바뀔 때마다 remount 되어 애니메이션 재생 */}
        <div className="hero-overlay" key={logical}>
          <div className="hero-shade-bottom" />
          <div className="hero-text">
            <p className="hero-en">{heroSlides[logical].en}</p>
            <p className="hero-ko">{heroSlides[logical].ko}</p>
          </div>
        </div>
      </div>

      {/* 좌우 화살표 — 뷰포트 밖(형제)에 두어 드래그 로직과 분리 */}
      <button
        type="button"
        className="hero-arrow hero-arrow-left"
        onClick={goPrev}
        aria-label="이전 이미지"
      >
        ‹
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow-right"
        onClick={goNext}
        aria-label="다음 이미지"
      >
        ›
      </button>
    </div>
  )
}
