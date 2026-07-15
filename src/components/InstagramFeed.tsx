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
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/744738147_17879626521674072_3857406949846790805_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzk0MDkyNTE5MjI1OTg2MTIyMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=Lls76F1tOB8Q7kNvwFdXctg&_nc_oc=AdouIt-Tv-ITo2j-d_ReGh6zt8ntezSDsIgbfUMDNKDJFSXXH1h17ZjDEVh-VMCkiPU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=gMr0HKTHnSqZJCaVYLRe7w&_nc_ss=7a22e&oh=00_AQAEqH_yKP4jFKzyV-JWNF7ynLGpm1XPHi2wb6tGzUoKig&oe=6A5CBBF2", 
    link: "https://www.instagram.com/p/Daw-pUbCXrn/"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/743146234_17878846956674072_8114632021753200736_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzkzODAwNzMzMDU2MjA4MDkxMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=q4Jb6qLHngcQ7kNvwFCVqYF&_nc_oc=AdoKw4-PzTyQoO8aYV6SN2U0bBY6ZpXb4GLrj-sCPZW6ORUgUY6Gl9F0U3SL5igAfdg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=rwLRpWMrwqoaTTrRYWAzhQ&_nc_ss=7a22e&oh=00_AQDVxTB_sT4XVkGJHBW5TVSbWhJXgdM9GZr8gGpW8B_xxw&oe=6A5C98A2", 
    link: "https://www.instagram.com/p/DamnM-Iia3S/?img_index=1"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/742278497_17878628805674072_7870567853658258811_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzkzNzMxOTUyNDY4NDY0MDIyNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=qhZptGHT-dsQ7kNvwEnjESm&_nc_oc=AdpknRNL31ydBs0TH-n7nTkvboKvZp0Aw5UX2wnTzU9ka0JJhFWYZQuNqCnQRzHPt_E&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=rwLRpWMrwqoaTTrRYWAzhQ&_nc_ss=7a22e&oh=00_AQBK1uI1HOhaZK6QNlbGDqJIReQz-2MiIMBVyVZDDnu0Uw&oe=6A5CA9F4", 
  link: "https://www.instagram.com/p/DakK0D2iXHV/?img_index=1"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/730452653_17878589925674072_2290475916752472827_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzkzNzEzMDM1Mjk3NTg3OTAxNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=GsFIt_pt5TEQ7kNvwHA7zD6&_nc_oc=AdqnTey4Dr2OMK6of6QFDFzlWz1HukYn3Wi_dagUWahvowln8stEMBpaWvUcdsJpqR0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=42-tkwc3aFBVdYcPXgqT5Q&_nc_ss=7a22e&oh=00_AQDvLEhttO7qlpDqKzlEsJf-b1wwSko1pE8toaw3Kxus1g&oe=6A5CA6A4", 
  link: "https://www.instagram.com/p/DajfzQDiU69/?img_index=1"  },
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
