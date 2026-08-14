// 빌드 후 실행: 경로별 <head> 메타(title/description/canonical/og)를 정적 HTML에 구워 넣습니다.
//
// 왜 필요한가:
//   이 사이트는 CSR React SPA 라 모든 경로가 동일한 dist/index.html(메타 없는 껍데기)을 받습니다.
//   title/description/OG 는 react-helmet-async 가 JS 실행 후 주입하므로, JS 를 실행하지 않는
//   크롤러(네이버 URL검사, 링크 프리뷰 봇 등)는 경로별 메타를 전혀 못 봅니다.
//   → 여기서 경로별 index.html 을 만들어 서빙되는 HTML 자체에 메타를 넣습니다.
//
// 문구는 src/data/seo.js 한 곳에서만 관리합니다. 새 경로 추가 시 ROUTES 에 한 줄만 더하면 됩니다.
//
// ⚠️ Amplify 서빙: 확장자 없는 경로는 모두 루트 /index.html 로 rewrite 되므로,
//    경로별 파일이 실제로 서빙되려면 Amplify 콘솔의 Rewrites and redirects 에
//    경로별 200 rewrite 규칙을 추가해야 합니다. (README 하단 / 커밋 메시지 참고)

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { seoHome, seoBrand, seoProductsPage, seoProducts } from '../src/data/seo.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const SITE_URL = 'https://www.newed.kr' // 정본 도메인 (Seo.jsx 와 동일)

// 경로 → 메타. Seo.jsx 와 동일하게 og:title=title, og:description=description 로 맞춥니다.
const ROUTES = [
  { path: '/', ...seoHome },
  { path: '/brand', ...seoBrand },
  { path: '/products', ...seoProductsPage },
  { path: '/products/deep', ...seoProducts.deep },
  { path: '/products/bright', ...seoProducts.bright },
  { path: '/products/decaf', ...seoProducts.decaf },
]

// HTML 속성/텍스트에 안전하게 넣기 위한 이스케이프
const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function buildHead({ path, title, description }) {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  return `<title>${esc(title)}</title>
  <!-- prerender-seo: 경로별 메타 (빌드시 scripts/prerender-seo.mjs 가 주입) -->
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(url)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(url)}" />`
}

// 템플릿의 기본 <title>...</title> 을 경로별 head 블록으로 치환.
// 내용에 '<' 가 없는 실제 <title> 만 매칭 (주석 안의 "<title>" 문구를 잘못 잡지 않도록).
const TITLE_RE = /<title>[^<]*<\/title>/

async function run() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8')
  if (!TITLE_RE.test(template)) {
    throw new Error('dist/index.html 에서 <title> 를 찾지 못했습니다. 템플릿 구조가 바뀌었는지 확인하세요.')
  }

  for (const route of ROUTES) {
    const html = template.replace(TITLE_RE, buildHead(route))
    // '/' → dist/index.html, '/products/deep' → dist/products/deep/index.html
    const outFile =
      route.path === '/'
        ? join(DIST, 'index.html')
        : join(DIST, route.path.replace(/^\//, ''), 'index.html')
    await mkdir(dirname(outFile), { recursive: true })
    await writeFile(outFile, html, 'utf8')
    console.log(`  ✓ ${route.path.padEnd(18)} → ${outFile.replace(DIST + '\\', '').replace(DIST + '/', '')}`)
  }
  console.log(`prerender-seo: ${ROUTES.length}개 경로 메타 주입 완료`)
}

run().catch((err) => {
  console.error('prerender-seo 실패:', err)
  process.exit(1)
})
