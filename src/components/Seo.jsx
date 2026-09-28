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
 * - jsonLd 를 주면 <script type="application/ld+json"> 로 구조화 데이터를 주입합니다.
 *   객체 하나 또는 배열(여러 개)을 받습니다. 단, 이 태그는 CSR 렌더 이후에만 생성되므로
 *   JS 를 실행하지 않는 크롤러(네이버 등)는 보지 못합니다 — 실제 크롤러 노출은
 *   scripts/prerender-seo.mjs 가 빌드시 정적 HTML 에 굽는 동일 데이터가 담당합니다.
 */
export default function Seo({ title, description, path, image, noindex = false, jsonLd }) {
  const url = `${SITE_URL}${path}`
  const imageUrl = image ? `${SITE_URL}${image}` : null
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
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
      {jsonLdList.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  )
}
