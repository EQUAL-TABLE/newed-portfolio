# NEWED (newed.kr) — SEO 감사 리포트

분석일: 2026-07-14

분석 도구: Google Search Console 직접 접속 + Firecrawl 스크래핑

플랫폼: React SPA (자체 개발)

사이트 성격: B2C 마케팅 페이지 (직접 판매 없음, 외부 채널 연결)

---

## 📊 색인 현황 요약

| 구분 | 수치 | 비고 |
| --- | --- | --- |
| **색인 생성됨** | **1개** | 홈페이지 단 1개 |
| **색인 미생성** | **0개** | 미생성 이유 없음 |
| **Google이 발견한 총 URL** | **1개** | 홈 외 어떤 페이지도 발견 못함 |
| 색인 시작 시점 | 2026년 6월 말 | 매우 신규 사이트 |
| 최종 업데이트 | 2026. 6. 30. |  |

> **핵심 문제:** Google이 [newed.kr](http://newed.kr)에서 딱 1개 URL만 발견한 상태. "색인 미생성 이유가 없다"는 건 Google이 다른 페이지의 존재 자체를 모른다는 의미. React SPA 구조로 인해 크롤러가 JavaScript 실행 없이는 내부 링크를 따라가지 못하고, sitemap에도 1개 URL만 등록되어 있어 발생한 문제.
> 

---

## 🔴 미노출 근본 원인 분석

### 원인 1: React SPA — 크롤러가 내부 링크를 인식 못함 (가장 심각)

React SPA의 구조:

```
브라우저 접속 → 빈 HTML 수신 → JavaScript 실행 → 화면 렌더링
```

Googlebot의 크롤링 방식:

```
1단계 크롤링: HTML 수신 (빈 화면)
2단계 렌더링: 몇 주 후 JS 실행 (지연됨)
```

AI 봇(ChatGPT, Perplexity, Bing AI)은 JS 미지원 → 페이지 내용 인식 불가

**결과:** Google이 홈페이지(`/`)만 발견하고 `/products`, `/about` 등 나머지 경로는 존재를 모름.

---

### 원인 2: Sitemap에 1개 URL만 등록

Sitemap은 Google에 "이 URL들이 존재한다"고 직접 알려주는 수단. 현재 1개만 등록되어 있어 Google이 다른 페이지를 발견할 수단이 없음.

---

### 원인 3: www/non-www 미통일

`newed.kr`과 `www.newed.kr` 중 하나로 통일되지 않으면:

- 두 URL이 동일 사이트의 중복 버전으로 인식
- 링크 권위(PageRank)가 분산
- canonical 신호 약화

Search Console이 `https://www.newed.kr/`로 등록되어 있으므로, non-www(`newed.kr`)에서 www로 301 리디렉션이 설정되어 있는지 확인 필요.

---

### 원인 4: 신규 사이트 (2026년 6월 말 첫 색인)

6월 말에 첫 색인이 생성된 매우 신규 사이트. 도메인 권위(Domain Authority)가 거의 없고, 외부 백링크도 없는 상태. 신규 사이트는 Google이 신뢰를 쌓는 데 3~6개월 걸림.

---

### 원인 5: HTML에 텍스트 콘텐츠 부재

React SPA 특성상 JS 실행 전 HTML에는 텍스트가 없음. `<title>`, `<meta description>`, 본문 텍스트가 없으면 Google이 페이지 주제를 파악하지 못해 순위 부여 불가.

---

## ✅ 해결 방안 — 우선순위별

### [P1] Sitemap 즉시 확장 및 재제출 `이번 주 내`

**효과:** 가장 빠르게 할 수 있는 조치. Google에 나머지 페이지 존재를 즉시 알릴 수 있음.

**조치 방법:**

1. 현재 `sitemap.xml` 열어서 등록된 URL 확인
2. React 앱 내 모든 주요 경로를 수동으로 추가:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.newed.kr/</loc><priority>1.0</priority></url>
  <url><loc>https://www.newed.kr/products</loc><priority>0.9</priority></url>
  <url><loc>https://www.newed.kr/about</loc><priority>0.8</priority></url>
  <url><loc>https://www.newed.kr/brand</loc><priority>0.8</priority></url>
  <!-- 실제 경로에 맞게 추가 -->
</urlset>
```

1. Search Console → Sitemaps → 새 sitemap URL 제출
2. 제출 후 "URL 검사" 도구로 각 페이지 크롤링 요청

---

### [P1] www/non-www 통일 + canonical 설정 `이번 주 내`

**조치 방법:**

1. `newed.kr` (non-www) 접속 시 `www.newed.kr`로 301 리디렉션 설정 확인
    - 호스팅 설정 또는 `.htaccess` / `_redirects` 파일에서 설정
2. 모든 페이지 `<head>`에 canonical 태그 추가:

```html
<!-- 각 페이지 경로에 맞게 -->
<link rel="canonical" href="https://www.newed.kr/" />
```

1. React Router 사용 중이라면 `react-helmet` 또는 `react-helmet-async`로 페이지별 canonical 동적 설정

---

### [P1] 각 페이지 HTML 메타데이터 추가 `이번 주 내`

**문제:** JS 실행 전 HTML이 비어있어 Google이 페이지 주제를 파악 못함

**조치 방법 (react-helmet 사용):**

```jsx
import { Helmet } from 'react-helmet-async';

// 홈페이지
<Helmet>
  <title>NEWED(뉴드) — 열자마자 기분 좋아지는 가향 드립백 커피</title>
  <meta name="description" content="바샤커피급 향을 1만원대에. 20대 감성의 가향 드립백 커피 선물 브랜드 뉴드." />
  <link rel="canonical" href="https://www.newed.kr/" />
  <meta property="og:title" content="NEWED — 향으로 설레는 가향 드립백 커피" />
  <meta property="og:description" content="열자마자 기분 좋아지는 향. 예쁜 패키지. 1만원대 선물." />
  <meta property="og:url" content="https://www.newed.kr/" />
</Helmet>

// 상품 페이지
<Helmet>
  <title>NEWED 가향 드립백 — 플로럴/프루티 향 선물 세트</title>
  <meta name="description" content="바샤커피급 가향 퀄리티를 1만원대에. 직관적이고 강렬한 향의 드립백 커피." />
  <link rel="canonical" href="https://www.newed.kr/products" />
</Helmet>
```

---

### [P2] Google Search Console URL 검사 + 크롤링 요청 `다음 주`

**조치 방법:**

1. Search Console → URL 검사 도구
2. 각 주요 페이지 URL 입력 (`/products`, `/about` 등)
3. "색인 생성 요청" 버튼 클릭
4. 이렇게 하면 sitemap 제출과 별개로 Google에 직접 크롤링 요청 가능

---

### [P3] SSR/SSG 전환 검토 `중장기`

**문제:** React SPA 구조의 근본적 한계 — JS 없이는 내용을 볼 수 없음

**옵션 비교:**

| 방법 | 장점 | 단점 |
| --- | --- | --- |
| **Next.js SSG** (권장) | 빌드 시 HTML 생성, 빠른 로딩, 완전한 SEO | 개발 공수 필요 (React → Next.js 마이그레이션) |
| Next.js SSR | 동적 데이터에 적합 | SSG보다 서버 비용 높음 |
| Prerendering 서비스 ([Prerender.io](http://Prerender.io)) | 기존 React 유지 가능 | 월 비용 발생, 완전한 해결 아님 |
| 현재 유지 | 개발 없음 | Google이 JS 렌더링 지연 처리, AI 봇 인식 불가 영구 지속 |

**권장:** 마케팅 페이지이므로 **Next.js SSG**가 최적. 정적 페이지 생성으로 로딩 속도 + SEO 동시 해결.

---

### [P3] 외부 백링크 확보 `이번 달부터`

신규 사이트는 외부 사이트의 링크가 없으면 Google이 신뢰하지 않음.

**조치 방법:**

1. 인스타그램 바이오 링크를 `www.newed.kr`로 설정 (이미 되어 있을 가능성 높음)
2. 29cm, 카카오 선물하기 입점 시 브랜드 소개란에 자사몰 URL 추가
3. 펀딩 페이지(와디즈/텀블벅)에서 자사몰 링크 추가
4. 네이버 블로그/인플루언서 체험단 진행 시 반드시 `www.newed.kr` 링크 포함 요청

---

## 📈 개선 후 예상 효과

| 조치 | 예상 효과 | 소요 기간 |
| --- | --- | --- |
| Sitemap 확장 제출 | 나머지 페이지 Google 발견 → 색인 후보 등록 | 1~2주 |
| www 통일 + canonical | 링크 권위 집중, 중복 방지 | 즉시 ~ 1주 |
| 메타데이터 추가 | Google이 페이지 주제 파악 → 키워드 순위 진입 시작 | 2~4주 |
| URL 검사 크롤링 요청 | 개별 페이지 빠른 색인 | 1~2주 |
| 백링크 확보 | 도메인 권위 상승 → 전체 순위 개선 | 1~3개월 |
| SSR 전환 | 모든 페이지 완전한 색인, AI 검색 노출 | 전환 후 즉시 ~ 1개월 |
| **전체 완료 시** | **"가향 드립백", "커피 선물 1만원대" 키워드 검색 노출 시작** | **3~6개월** |

> **현실적 기대치:** 신규 도메인이라 단기 성과 한계 있음. 6개월 내에 브랜드명 검색 시 1페이지 노출을 1차 목표로 설정. 장기적으로 카카오 선물하기·컬리 입점 후 외부 링크가 쌓이면 검색 순위 자연 상승.
> 

---

## 📋 작업 체크리스트

- [ ]  현재 sitemap.xml 경로 확인 (`www.newed.kr/sitemap.xml`)
- [ ]  앱 내 모든 주요 경로 파악 후 sitemap에 추가
- [ ]  Search Console에 새 sitemap 제출
- [ ]  `newed.kr` → `www.newed.kr` 301 리디렉션 확인
- [ ]  모든 페이지에 `<link rel="canonical">` 추가
- [ ]  react-helmet 설치 및 각 페이지 title/description 설정
- [ ]  Search Console URL 검사로 주요 페이지 크롤링 요청
- [ ]  인스타그램 바이오에 `www.newed.kr` 링크 확인
- [ ]  외부 채널(29cm, 카카오, 펀딩) 브랜드 소개에 자사몰 URL 추가
- [ ]  Next.js 마이그레이션 일정 검토
- [ ]  4주 후 Search Console 재확인 (색인 수 변화)