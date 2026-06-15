import beach from "../assets/images/beach.jpg";

export default function FullImage() {
  return (
    <section
      className="w-full relative overflow-hidden"
      id="full-image-section"
    >
      {/*
        비율 기반 이미지 사이징(Aspect-Ratio Sizing) 주석:
        고정 픽셀(px) 높이를 인위적으로 정의하지 않고, 브라우저 스크롤 너비 변화에 유연하게 동기화되도록
        xl(1280px) 이상에서는 비율 1200:800 (aspect-[3/2]), 그 미만에서는 400:600 (aspect-[2/3])으로 나누어 비율을 할당합니다.
        JS 감지 없이 순수 CSS 브레이크포인트(xl)로 전환하여 초기 렌더 깜빡임을 제거했습니다.
      */}
      <div
        className="w-full relative overflow-hidden aspect-[2/3] xl:aspect-[3/2]"
        id="full-image-container"
      >
        {/* 이미지 아트디렉션: xl(1280px) 이상에서 가로형 고해상 이미지, 미만에서는 세로형 모바일 이미지로 CSS-only 스왑 */}
        <picture>
          <source
            media="(min-width: 1280px)"
            srcSet={beach}
          />
          <img
            src={beach}
            alt="Friends at the beach under umbrella enjoying Newed coffee"
            className="w-full h-full object-cover select-none transition-all duration-700 hover:scale-[1.01]"
            loading="lazy"
            id="full-bleed-illustration-image"
          />
        </picture>
      </div>
    </section>
  );
}
