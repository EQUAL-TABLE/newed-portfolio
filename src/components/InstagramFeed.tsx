import { useEffect } from "react";

/**
 * 표시할 인스타그램 게시물 4개의 permalink(고정 링크) 목록입니다.
 * 새 게시물로 교체하려면, 해당 게시물 우상단 ··· 메뉴 > "링크 복사"로 받은
 * https://www.instagram.com/p/XXXXXXXXX/ 형태의 주소를 아래 배열에 넣어주세요.
 * (릴스는 /reel/XXXX/ 형태도 그대로 사용 가능합니다.)
 *
 * 공식 embed.js가 로그인 없이 가져올 수 있는 "지정한 게시물"이므로,
 * 최신 글이 올라오면 이 배열의 URL을 직접 갈아끼워야 4개가 갱신됩니다.
 */
const POSTS: string[] = [
  "https://www.instagram.com/p/REPLACE_ME_1/",
  "https://www.instagram.com/p/REPLACE_ME_2/",
  "https://www.instagram.com/p/REPLACE_ME_3/",
  "https://www.instagram.com/p/REPLACE_ME_4/",
];

const EMBED_SCRIPT_SRC = "https://www.instagram.com/embed.js";

// 인스타그램 embed.js가 전역(window)에 주입하는 객체 타입 선언
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default function InstagramFeed() {
  useEffect(() => {
    // embed.js가 아직 없으면 1회만 주입, 이미 있으면 재처리만 수행합니다.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT_SRC}"]`
    );

    if (existing) {
      // 스크립트가 이미 로드되어 있으면 새로 렌더된 blockquote들을 변환 처리
      window.instgrm?.Embeds.process();
      return;
    }

    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    // 로드 완료 시점에 blockquote -> 실제 임베드로 변환
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, []);

  return (
    <section
      className="bg-[#fafaf8] py-8 md:py-16 lg:py-24 xl:py-[100px] w-full"
      id="instagram-feed-section"
    >
      <div
        className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[100px] w-full max-w-[1980px] mx-auto"
        id="instagram-feed-inner-container"
      >
        {/* 섹션 타이틀: 계정 핸들로 인스타그램 영역임을 명시 */}
        <a
          href="https://www.instagram.com/newed_official/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-6 md:mb-10 lg:mb-12 select-none"
          id="instagram-feed-heading-link"
        >
          <h2
            className="font-semibold text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[70px] uppercase font-sans text-[#000000]"
            style={{ letterSpacing: "-0.04em" }}
            id="instagram-feed-heading"
          >
            @newed_official
          </h2>
        </a>

        {/* 모바일 1열, 그 이상에서 2x2 그리드 */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
          id="instagram-feed-grid"
        >
          {POSTS.map((permalink, index) => (
            <div
              key={permalink}
              className="flex justify-center"
              id={`instagram-feed-cell-${index + 1}`}
            >
              {/* embed.js가 이 blockquote를 실제 게시물 임베드로 치환합니다. */}
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={permalink}
                data-instgrm-version="14"
                style={{
                  background: "#FFF",
                  border: 0,
                  borderRadius: "3px",
                  boxShadow:
                    "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                  margin: 0,
                  maxWidth: "540px",
                  minWidth: "0",
                  padding: 0,
                  width: "100%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
