import { Helmet } from 'react-helmet-async'

// 정본 도메인 (canonical / og:url 조립용)
const SITE_URL = 'https://www.newed.kr'

/**
 * 경로별 <head> 메타를 관리하는 공통 컴포넌트.
 * - title / description / canonical / og:title / og:description / og:url 을 경로마다 설정
 * - image 를 주면 og:image 를 경로별로 덮어씁니다(index.html 전역 OGimage.png 대체).
 *   Helmet 이 property 기준으로 중복 태그를 덮어쓰므로 전역 태그와 충돌하지 않습니다.
 * - image 없으면 index.html 의 공통 og:image(OGimage.png) 를 그대로 사용합니다.
 * - noindex=true 면 검색엔진 색인에서 제외 (예: 상품 미존재 페이지)
 */
export default function Seo({ title, description, path, image, noindex = false }) {
  const url = `${SITE_URL}${path}`
  const imageUrl = image ? `${SITE_URL}${image}` : null
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  )
}
