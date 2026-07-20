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
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/747670008_17880006510674072_2934992260536695791_n.jpg?stp=dst-jpg_e35_p640x640_sh2.08_tt6&_nc_cat=104&ig_cache_key=Mzk0MjM1MjE4NjUyMDQ5MTk1NA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=-V5ihG7IyT0Q7kNvwFu_z7B&_nc_oc=AdpvqkhgO0FO6C4vLOEksx34bE7A4OWwLliFSr9KkP-7sDDVOIeU078fbD9NN9oNQ4k&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=HPxWBZQoIQH6OWSTpQEtow&_nc_ss=7a22e&oh=00_AQCVWTHA_sejrm4nmShgNtRce-fdpbmgkFMDE0-dt1CnOw&oe=6A636B8F", 
    link: "https://www.instagram.com/p/Da2DG0ZCdey/"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/746319955_17879813448674072_2354659964287731953_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=Mzk0MTY0ODg0ODI1NDUxMzI2Mg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=m6SPGBb_vzcQ7kNvwEffhzG&_nc_oc=AdpKqO9naGeM7PJCrhQG-53lI8e04Wv1hqwxZgTUZp79__v6sndvLm4aP54HQLxH74U&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=_8kvoH-oLdlQcLZryMaLHw&_nc_ss=7a22e&oh=00_AQCl10H4Uzf28uLxNV86SJzxz8KkLi0z6S9MZtBU_SosQQ&oe=6A635216", 
    link: "https://www.instagram.com/p/DazjL5libBu/"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/744738147_17879626521674072_3857406949846790805_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzk0MDkyNTE5MjI1OTg2MTIyMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=OE33f5vwtYYQ7kNvwET8jXs&_nc_oc=Adrsj1ewYGUwaGVr-d8dXr93-wNA9w-AH3BB6q7TzGRbtD124GJPJGtWgmkibn3K_q0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=_8kvoH-oLdlQcLZryMaLHw&_nc_ss=7a22e&oh=00_AQC1wQA8fIClBObEIREAqc3UAstjTaxnH5JMODEO_6ULSw&oe=6A635372", 
    link: "https://www.instagram.com/p/Daw-pUbCXrn/"  },
  { img: "https://scontent-icn2-1.cdninstagram.com/v/t51.82787-15/743146234_17878846956674072_8114632021753200736_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=MzkzODAwNzMzMDU2MjA4MDkxMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTIwMC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=p-SStUqeHg0Q7kNvwGGwRSF&_nc_oc=AdoPWG9U4c-UFbEpSDSiDtEKsu4ybH96gk9GyDHBGi2iQ388PByFtzxncGcJoCjgu2Q&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-icn2-1.cdninstagram.com&_nc_gid=_8kvoH-oLdlQcLZryMaLHw&_nc_ss=7a22e&oh=00_AQDKY6mGHvj_sJZ2_trTswtH5pdFCINUSqoOpg9mgBR4qQ&oe=6A636862", 
    link: "https://www.instagram.com/p/DamnM-Iia3S/?img_index=1"  },
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
