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
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/728893215_17877428490674072_6524318905104136526_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=111&ig_cache_key=MzkzMjk0Nzg3NzI0MDMyNjc0OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=DAO4-rYMaEEQ7kNvwEinvE0&_nc_oc=AdrINnlMLmXB1UlC4b9bnKgvTOer8NQWOymxRlQ7s41eqt5rG8pxmv3uKPAjfyrqLLQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=8XTH3COrgYoqO29JlPprSQ&_nc_ss=7a22e&oh=00_AQCs5f0P4Z0-S2h8I5t7CT3nm09r1dnP15NkX5gH-kKMFw&oe=6A4D5441", 
    link: "https://www.instagram.com/p/DaUo0G3CUpd/"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/728451637_17877412941674072_4072161154926222307_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=108&ig_cache_key=MzkzMjg4Mzk1MzQ4MDQ4NDI2Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=WKuRSCwZgGYQ7kNvwErLgqp&_nc_oc=Adp1YnV55b-HXX9eGIM6k-un14NI964-u330qjd2h0_QXgPe6AV_vS165nL6yj8bXik&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=bvPzXeI-woK45CCsVqXpuQ&_nc_ss=7a22e&oh=00_AQB0zr12si0mIaSfy0UvKWHzJ4y9xLMXXspRdOkcXkgynA&oe=6A4D1545", 
    link: "https://www.instagram.com/p/DaUaR5OCcWn/"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/731069701_17877385803674072_3287896273577846100_n.jpg?stp=dst-jpg_e35_p1080x1080_tt6&_nc_cat=102&ig_cache_key=MzkzMjc2NjQ3MTI2MDI4NTU3NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTUzNi5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=wQVost2ZtoAQ7kNvwFkigQu&_nc_oc=Adr-TymIru_eRpNdXm02DS6X_z1PuYhstRFqOQQQZHsTr_dwNp24fZMy6vApSQ2arbE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=bvPzXeI-woK45CCsVqXpuQ&_nc_ss=7a22e&oh=00_AQCwfUW_TMW8_jv3h0BxFXfTtvYuQxSUjNw60HXzeerDDw&oe=6A4D451D", 
    link: "https://www.instagram.com/p/DaT_kTYCSqG/"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/731769800_17877263844674072_1279893957275539157_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzkzMjI0MTU5MzA3MTM5MDkzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTAwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=HqDNgiktF4cQ7kNvwETdMZR&_nc_oc=Ado0hrrq5X3fADIQnUpWsC7SOdpTQ1Hq-BZZOL4E7X0xZK5clVglKhjO_CnE4nvF28g&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=bvPzXeI-woK45CCsVqXpuQ&_nc_ss=7a22e&oh=00_AQA1GWCeX4iJMwO1H_leFxjHC6B7Pw8pbM3G5c0FCPCBug&oe=6A4D1BEF", 
    link: "https://www.instagram.com/p/DaSIOUeCVDY/"  },
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
