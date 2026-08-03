import feed from '../data/instagramFeed.json'

// 인스타 수집 워크플로(scripts/fetch-instagram.mjs)가 최신 6개를
// src/data/instagramFeed.json + public/instagram/post-N.webp 로 갱신합니다.
const posts = (feed.posts || []).slice(0, 6)

export default function InstaGrids() {
  return (
    <section>
      <h2 className="section-title">뉴드와 함께하는 새로운 시작</h2>
      <div className="grid">
        {posts.map((post, i) => (
          <a
            key={post.link || i}
            className="box"
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={post.img} alt={post.alt} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  )
}
