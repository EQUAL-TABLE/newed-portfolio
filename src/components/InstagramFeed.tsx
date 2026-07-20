/**
 * 인스타그램 최신 게시물 4개를 2x2 그리드로 노출하는 섹션입니다.
 *
 * 게시물 데이터(src/data/instagramFeed.json)와 이미지(public/instagram/post-N.webp)는
 * scripts/fetch-instagram.mjs 가 1시간마다(GitHub Actions) 자동 수집/갱신합니다.
 * 인스타 CDN URL은 만료되므로 이미지를 레포에 로컬 자산으로 내려받아 사용합니다.
 * → 이 파일과 데이터 파일을 손으로 수정할 필요가 없습니다.
 *
 * 노출 범위: 모바일 뷰에서만 보이고 데스크톱(웹) 뷰에서는 숨깁니다(md 이상 hidden).
 */
import { trackOutbound } from "../lib/analytics";
import feed from "../data/instagramFeed.json";

// 인스타그램 프로필 URL (제목 클릭 시 이동)
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/newed_official/";

const POSTS = feed.posts;

export default function InstagramFeed() {
  return (
    <section
      // 모바일 전용: md(768px) 이상에서는 숨김
      className="bg-[#fae6aa] py-8 md:py-16 w-full block md:hidden"
      id="instagram-feed-section"
    >
      <div
        className="px-4 sm:px-6 w-full max-w-[1980px] mx-auto"
        id="instagram-feed-inner-container"
      >
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOutbound("instagram_feed", INSTAGRAM_PROFILE_URL)}
          className="inline-block mb-6 select-none"
          id="instagram-feed-heading-link"
        >
          <h2
            className="font-semibold text-5xl uppercase font-sans text-[#000000]"
            style={{ letterSpacing: "-0.04em" }}
            id="instagram-feed-heading"
          >
            INSTAGRAM
          </h2>
        </a>

        {/* 2x2 그리드 */}
        <div className="grid grid-cols-2 " id="instagram-feed-grid">
          {POSTS.map((post, index) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutbound("instagram_feed", post.link)}
              className="group relative block overflow-hidden bg-black/5"
              id={`instagram-feed-cell-${index + 1}`}
              aria-label="newed_official 인스타그램 게시물 보기"
            >
              <img
                src={post.img}
                alt={post.alt || "newed_official 인스타그램 게시물"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
