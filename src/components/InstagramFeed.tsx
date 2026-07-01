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
import { trackOutbound } from "../lib/analytics";

// 인스타그램 프로필 URL (제목 클릭 시 이동)
const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/newed_official/";

const POSTS = [
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/728823820_17877027645674072_5562843930059095470_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzkzMTMzNDU1MzkxODU4MDU5NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTAwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=ul0lcfCrInAQ7kNvwGCOE_G&_nc_oc=Ado8f6WJR14wD9kPtGoJsbxCZA2p1ssSMJqVYfvZgJx7lP1zbf0m_GKdc2XaNaddnNo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=IyQV95m58KWPE4Lsclp9kg&_nc_ss=7a22e&oh=00_AQBmB1MFvlgarjU3vY0CTqRaY1M9cInCWA868KUxk9rk5A&oe=6A4A59C8", 
    link: "https://www.instagram.com/p/DaO5_KbiSdy/"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/730381785_17876855370674072_6747836137945473184_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=MzkzMDc2ODA1Mzc2MzY5MTkzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=WD_ocudbVroQ7kNvwHoDQiH&_nc_oc=Adp-IHpRtKI9anWUiAnjp1drxStYws6XSd18Yk3BQkCFd0MA7SY4Py5QJ6Gu3_yTojU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=IyQV95m58KWPE4Lsclp9kg&_nc_ss=7a22e&oh=00_AQB6UV0Z3T7TDHO_eKkmrIwse1FzCm3UkYiyjANqBhBMJw&oe=6A4A4715", 
    link: "https://www.instagram.com/p/DaM5LgDCdWg/"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/728678483_17876065653674072_2247979144059458930_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzkyNzg3MDIzNjc0NTM4OTkxNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=NJY0G0zlPlwQ7kNvwFaRqWb&_nc_oc=AdqjeIfyxgb_-r6R0l0qKGH2qfjEjCcJE3rtO0OIl2hXrF7IM4kufNaJkVDfQgMjLAA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=IyQV95m58KWPE4Lsclp9kg&_nc_ss=7a22e&oh=00_AQBV_OcHM46cwN-esQiA-LBTv2wv8N6GLlKAzjSy8L55WA&oe=6A4A5131", 
    link: "https://www.instagram.com/p/DaCmStpCddd/" },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/728868035_17875717035674072_2282447184216864118_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=MzkyNjQ0OTAwNzgwNzI2NDQ5NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=eIKcZJfaW58Q7kNvwHS7IMh&_nc_oc=AdpOK7T5X47yFDTLgT1VXBhEGhG7OL3oVTsRptvmXZGaEWzXoMkWHZoD2xnx_HJ29o8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=IyQV95m58KWPE4Lsclp9kg&_nc_ss=7a22e&oh=00_AQCVP5o6Liwvyto9a4ldOid57xyFSPcKuz6kuiclh_MgSQ&oe=6A4A7290", 
    link: "https://www.instagram.com/p/DZ9jJHDCXbu/" },  
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
