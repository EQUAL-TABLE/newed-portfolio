import { Helmet } from 'react-helmet-async'

// 정본 도메인 (canonical / og:url 조립용)
const SITE_URL = 'https://www.newed.kr'

/**
 * 경로별 <head> 메타를 관리하는 공통 컴포넌트.
 * - title / description / canonical / og:title / og:description / og:url 을 경로마다 설정
 * - 사이트 공통 태그(og:image, og:site_name, verification 등)는 index.html 에 그대로 둡니다.
 * - noindex=true 면 검색엔진 색인에서 제외 (예: 상품 미존재 페이지)
 */
export default function Seo({ title, description, path, noindex = false }) {
  const url = `${SITE_URL}${path}`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {noindex && <meta name="robots" content="noindex" />}
    </Helmet>
  )
}
