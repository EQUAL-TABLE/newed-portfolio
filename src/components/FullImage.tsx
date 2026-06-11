import { useState, useEffect } from "react";

export default function FullImage() {
  // 웹 해상도와 모바일 해상도의 획기적인 이미지 로드 제어를 위해 break-point 감지 state 구성
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 768px 규격을 기점으로 모바일 여부 판정
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <section 
      className="w-full relative overflow-hidden" 
      id="full-image-section"
    >
      {/* 
        비율 기반 이미지 사이징(Aspect-Ratio Sizing) 주석:
        고정 픽셀(px) 높이를 인위적으로 정의하지 않고, 브라우저 스크롤 너비 변화에 유연하게 동기화되도록
        웹 규격에서는 비율 1200:800 (aspect-[3/2]), 모바일 환경에서는 400:600 (aspect-[2/3])으로 나누어 비율을 할당합니다.
        이렇게 하면 이미지 뭉개짐 현상 없이 어떤 디바이스크기에서나 아름답게 유지가 가능합니다.
      */}
      <div 
        className="w-full relative overflow-hidden transition-all duration-300"
        style={{ aspectRatio: isMobile ? "2/3" : "3/2" }}
        id="full-image-container"
      >
        <img
          src={isMobile ? "https://placehold.co/400x600/BFBFBF/ffffff?text=Beach+Friends+Summer+Escape" : "https://placehold.co/1200x800/BFBFBF/ffffff?text=Beach+Friends+Summer+Escape"}
          alt="Friends at the beach under umbrella enjoying Newed coffee"
          className="w-full h-full object-cover select-none transition-all duration-700 hover:scale-[1.01]"
          loading="lazy"
          id="full-bleed-illustration-image"
        />
      </div>
    </section>
  );
}
