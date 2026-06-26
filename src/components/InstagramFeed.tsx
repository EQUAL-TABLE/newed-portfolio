/**
 * 인스타그램 최신 게시물 4개를 2x2 그리드로 노출하는 섹션입니다.
 *
 * 현재는 토큰 기반 자동 수집 대신 "수동 등록" 방식입니다.
 * 이미지는 인스타 CDN URL이 만료되는 문제를 피하기 위해 레포에 로컬 자산
 * (src/assets/images/instagram/post-N.webp)으로 저장해 사용합니다.
 * 새 게시물로 교체하려면 이미지를 같은 위치에 덮어쓰고 link만 갱신하세요.
 *
 * 노출 범위: 모바일 뷰에서만 보이고 데스크톱(웹) 뷰에서는 숨깁니다(md 이상 hidden).
 */
const POSTS = [
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/728868035_17875717035674072_2282447184216864118_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzkyNjQ0OTAwNzgwNzI2NDQ5NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=o6ikOtdNLnAQ7kNvwFPQy9b&_nc_oc=AdrLo9xO0qrMYS-KNMy6_m-8RMnwwg3g9WJrXmGr6suYFS2oQQ5PvGMxos0Ffr70aMs&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=FrT6bdPCElglLsvzT7rCIw&_nc_ss=7a22e&oh=00_Af-XH2JwAuV0coyPbb4VFvBi8eeyxLfmIvq0XQEb7_oaPQ&oe=6A43A2D0", link: "https://www.instagram.com/newed_official/p/DZ9jJHDCXbu/" },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/730397607_17875546965674072_8534657792478493089_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzkyNTY5OTQ3ODE2NjI2MzI3OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=lbwSZDyB2BcQ7kNvwE1sodM&_nc_oc=AdrsEp3N04SLmx5yphLPaXBYb4i1hwBqeTB-ZrPJxm4w6a9Wgiveqw-tV9XV9uMmDJk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=3NgCExl2IuemzJlnTUG81w&_nc_ss=7a22e&oh=00_Af_jWkjddhmqp6B_VpMKfwn4jpcs7Qr2QGQNx8mUwH9nKg&oe=6A438C3B", link: "https://www.instagram.com/newed_official/p/DZ64uBLCVXv/" },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/726694560_17874792576674072_2665305150130031822_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=MzkyMjcxMDU5MjAwMzU3Njk5Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=lbgUv0g69-YQ7kNvwEGXygJ&_nc_oc=Adof-fBQCu-S9o1S2XIRfHryX7Pp6XWm0wI10uQeEiq19CysKkhlSS3pYr4KtKjs6io&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=sxsVQTyynHyFaqD0s9qZSw&_nc_ss=7a22e&oh=00_Af83JjQ--4guZH1bw3rInrf3HjLWLsnJFVugGhJhdB2TEw&oe=6A43A1A8", link: "https://www.instagram.com/newed_official/p/DZwRIKyCR7E/?img_index=1" },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/724261727_17874638214674072_6721517135165973907_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzkyMjA1OTI0MDc1OTk3NTY3MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=FgI2y6uhDqsQ7kNvwEzcSdv&_nc_oc=AdqXB7bFY_DYf0enZj99AbwdcnqSMj8Am21XpLZLKgkhP3nwqsUfDhnDXhq34_O5KZw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=af37YdqQS0lLzaxqjdBxaQ&_nc_ss=7a22e&oh=00_Af9ZK-PCAaUlBc7FLZnMUB56R-2qq2c6kwURHg42P1aW7w&oe=6A4392CA", link: "https://www.instagram.com/newed_official/p/DZt9Bl5iV73/" },
];

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
          href="https://www.instagram.com/newed_official/"
          target="_blank"
          rel="noopener noreferrer"
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
              className="group relative block overflow-hidden bg-black/5"
              id={`instagram-feed-cell-${index + 1}`}
              aria-label="newed_official 인스타그램 게시물 보기"
            >
              <img
                src={post.img}
                alt="newed_official 인스타그램 게시물"
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
