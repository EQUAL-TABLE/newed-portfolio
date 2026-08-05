# NEWED 사용자 행동 분석(GA4/전환) 구현 문서 (v2 · as-built)

> 최초 작성(계획서): 2026-06-24 · **v2 구현 반영: 2026-08-04**
> 대상: NEWED 사이트 (React 18 + Vite SPA / AWS Amplify)
> 상태: **구현 완료** (v2 컴포넌트에 배선). 이벤트 상세는 [GA4-이벤트정리](GA4-이벤트정리.md), Meta는 [Meta-데이터세트-연동가이드](Meta-데이터세트-연동가이드.md).

---

## 1. 목표

방문자의 행동 특성을 수집해 GA4·Meta·Naver에서 마케팅 자료로 활용한다.

수집 핵심: ① 내부 메뉴 클릭 ② 외부 전환 클릭(카카오/인스타) ③ 제품 관심(카드/상세) ④ 섹션 노출·체류 ⑤ 슬라이더/아코디언/모달 등 UI 인터랙션.

---

## 2. 아키텍처 (실제 구현)

```
index.html
  ├─ GTM 스니펫(GTM-553DQ9ML)         → Meta 픽셀/전환
  └─ wcslog.js                         → Naver PV/전환

src/lib/analytics.ts        ← 추적 단일 진입점
  ├─ initGA()               ← gtag.js 로드 (send_page_view:false)
  ├─ trackPageView(path)    ← SPA 라우트별 page_view
  ├─ trackMenuClick / trackShopClick / trackInstagramClick
  ├─ trackProductClick / trackContentView / trackIconClick
  ├─ trackHeroSlide / trackAccordionToggle / trackModalOpen
  ├─ trackSectionVisit
  └─ (전환 시 dataLayer push + naverConversion 동시 호출)

src/lib/naverConversion.ts  ← wcs.trans (lead / custom001 / view_content)
src/hooks/useSectionTracking.ts ← IntersectionObserver 섹션 체류
src/main.jsx                ← initGA() 1회
src/App.jsx                 ← 라우트 변경마다 trackPageView
```

### 전송 경로 결정 근거
- **GA4 = gtag 직접(initGA).** GTM 컨테이너에 GA4(Google) 태그가 없음을 실측 확인 → gtag 직접 전송해도 `page_view` 이중집계 없음. (프로젝트 메모리 `gtm-ga4-topology`)
- **Meta = dataLayer.** GTM에 이미 `conversion_shop/instagram/content` CE 트리거로 Lead/Contact/ViewContent 태그가 배선돼 있어, 코드가 dataLayer로 push만 하면 소비됨. GTM 신규 작업 불필요.
- **Naver = wcs.trans.** 클릭 시점에 직접 전송.

### 설계 원칙
- 단일 진입점(analytics.ts)로 이벤트/파라미터 일관성 확보
- `VITE_GA_ID` 가드 — 없으면(로컬) GA4 무시, dataLayer/Naver는 동작
- 기존 UI/동작 무침습 — 추적 호출 한 줄씩만 추가

---

## 3. 배선 위치 (컴포넌트별)

| 컴포넌트 | 요소 | 호출 |
|---|---|---|
| [Header](../src/components/Header.jsx) | 로고/뉴드/브랜드/제품 | `trackMenuClick(name,'header')` (제품 → /products 내부) |
| Header | 이벤트(인스타) | `trackInstagramClick('header', url)` |
| [IconList](../src/components/IconList.jsx) | BEST / 카카오 / 인스타 | `trackIconClick` / `trackShopClick('icon')` / `trackInstagramClick('icon')` |
| [ProductCard](../src/components/ProductCard.jsx) | 제품 카드 | `trackProductClick(name,id,index)` |
| [ProductSection](../src/components/ProductSection.jsx) | 제품 더 알아보기 CTA | `trackShopClick('product_more', url)` |
| [Hero](../src/components/Hero.jsx) | 화살표/스와이프 | `trackHeroSlide(dir, index)` |
| Hero | 슬라이드 탭 | 외부 `trackShopClick('hero', to)` / 내부 `trackHeroClick(to, index)` |
| [InstaGrids](../src/components/InstaGrids.jsx) | 피드 포스트 | `trackInstagramClick('feed', url, i)` |
| [Footer](../src/components/Footer.jsx) | 브랜드소개/사업자정보/인스타/개인정보 | `trackMenuClick('brand','footer')` / `trackAccordionToggle` / `trackInstagramClick('footer')` / `trackModalOpen('privacy')` |
| [ProductDetail](../src/pages/ProductDetail.jsx) | 페이지 진입 | `trackContentView(name,'detail',id)` (ViewContent, 경로 무관 1회) |
| ProductDetail | 바로 구매 | `trackShopClick('buybutton_<id>', url, id)` |
| ProductDetail | 관련상품 링크 | `trackProductClick(name,id,i)` |
| [Brand](../src/pages/Brand.jsx) | 페이지 진입 | `trackContentView('브랜드','page')` |
| [Home](../src/pages/Home.jsx) | 7개 섹션 | `useSectionTracking(SECTIONS)` (각 컴포넌트에 `id` 부여) |

---

## 4. 사전 준비 / 환경변수

- GA4 속성·측정 ID `G-LM5JB1XLHP` (발급 완료)
- **Amplify 환경변수 `VITE_GA_ID`** — 빌드 타임 주입([amplify.yml](../amplify.yml)이 `.env.production`으로 기록). v2 배포 브랜치에도 동일 값이 걸려 있는지 확인.

---

## 5. 배포 후 검증 & 콘솔 작업

### 검증
- [ ] GA4 **DebugView**로 이벤트·파라미터 수신 확인 (한 번 클릭 = 1건)
- [ ] GTM **미리보기**로 `conversion_*` 발화 + Meta 태그 Fired 확인
- [ ] Meta **테스트 이벤트**로 Lead/Contact/ViewContent 실시간 확인
- [ ] `npm run build` 통과

### 콘솔 설정 (소급 안 됨)
- [ ] **GA4 맞춤 정의**: `source`·`product_id`·`label`·`menu_name`·`section`·`seconds` (→ [GA4-이벤트정리 §6](GA4-이벤트정리.md))
- [ ] **Meta 맞춤 전환**: 위치·상품별 분해가 필요하면 조합 생성 (→ [Meta 가이드](Meta-데이터세트-연동가이드.md))

---

## 6. 리스크

| 항목 | 내용 |
|---|---|
| 개인정보 | GA/Meta 쿠키 사용 → 개인정보처리방침 고지(현재 Footer 모달에 존재) |
| 환경변수 | `VITE_GA_ID` 미등록 시 GA4 미수집 → DebugView로 확인 |
| 광고차단기 | 일부 사용자 gtag/픽셀 차단 → 수집률 100% 아님(업계 공통) |
| 매칭 품질 | 개인정보 입력 폼이 없어 Meta 고급 매칭 식별자 적음(구매의도까지가 최대치) |
