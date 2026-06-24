import beach from "../assets/images/beach.webp";

export default function FullImage() {
  return (
    <section
      className="w-full relative overflow-hidden"
      id="full-image-section"
    >
      {/*
        세로로 긴 이미지를 잘림 없이 전체 노출하기 위한 처리:
        고정 비율(aspect-ratio)과 object-cover로 컨테이너에 맞춰 자르는 대신,
        이미지를 자연 비율(h-auto)로 렌더링하여 Web/Mobile 어느 뷰에서든
        상·하단 잘림 없이 이미지 전체가 화면 너비에 맞춰 표시됩니다.
      */}
      <div
        className="w-full relative overflow-hidden"
        id="full-image-container"
      >
        <img
          src={beach}
          alt="Friends at the beach under umbrella enjoying Newed coffee"
          className="block w-full h-auto select-none transition-all duration-700 hover:scale-[1.01]"
          loading="lazy"
          id="full-bleed-illustration-image"
        />
      </div>
    </section>
  );
}
