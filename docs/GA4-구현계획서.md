# NEWED 웹사이트 사용자 행동 분석(GA4) 구현 계획서

> 작성일: 2026-06-24
> 대상: NEWED 포트폴리오 사이트 (React 19 + Vite SPA / AWS Amplify 배포)
> 목적: 사용자의 사이트 내 행동 특성을 수집하여 GA4 마케팅 자료로 활용

---

## 1. 목표

사이트 방문자가 보이는 **행동 특성**을 데이터로 수집하고, GA4 대시보드에서 마케팅 자료로 조회한다.

수집하려는 핵심 행동:

| # | 행동 데이터 | 설명 |
|---|---|---|
| 1 | **메뉴 클릭** | 상단바(웹/모바일)에서 어떤 메뉴를 눌렀는가 |
| 2 | **버튼 클릭** | SHOP, INSTAGRAM, 제품 카드, 슬라이더 썸네일, 아코디언 등 |
| 3 | **섹션 노출(view)** | 스크롤을 내려 어떤 섹션까지 봤는가 |
| 4 | **섹션 체류시간(dwell)** | 각 섹션에 얼마나 오래 머물렀는가 |
| 5 | **외부 전환** | 와디즈 스토어 / 인스타그램으로 몇 명이 이탈했는가 |

---

## 2. 기술 전제 및 환경

- **스택**: React 19, Vite 6, TypeScript, Tailwind 4
- **배포**: Repo → GitHub → AWS Amplify (정적 호스팅)
- **GA4는 100% 클라이언트 사이드** 동작 → 배포 환경(Amplify)과 무관하게 정상 작동
- **추가 서버 불필요** — 프론트엔드 코드 변경만으로 완결

### 사전 준비 (코드 작업 전 필수)
1. Google Analytics 4 **속성(Property) 생성**
2. **측정 ID** 발급: `G-XXXXXXXXXX`
3. AWS Amplify 콘솔 → 환경변수에 `VITE_GA_ID = G-XXXXXXXXXX` 등록
   - ⚠️ Vite 환경변수는 **빌드 타임 주입** → 등록 후 **재배포** 필요

---

## 3. 현재 사이트의 인터랙션 요소 (추적 대상 인벤토리)

| 컴포넌트 | 요소 | 추적 이벤트(안) |
|---|---|---|
| `Navbar.tsx` | HOMEPAGE / STORIES / PRODUCT 메뉴 | `menu_click` (내부 스크롤) |
| `Navbar.tsx` | SHOP 버튼 | `outbound_click` (와디즈) |
| `Navbar.tsx` | INSTAGRAM 버튼 | `outbound_click` (인스타) |
| `Navbar.tsx` | 로고 클릭 | `menu_click` (홈으로) |
| `Navbar.tsx` | 모바일 햄버거 토글 | `ui_toggle` |
| `HeroSlider.tsx` | 썸네일 클릭 (`handleThumbClick`) | `slider_thumb_click` |
| `Stories.tsx` | 더보기 아코디언 (`setIsOpen`) | `accordion_toggle` |
| `ProductSection.tsx` | 제품 카드 3종 (`handleProductClick`) | `product_click` |
| `FloatingCart.tsx` | 장바구니 → 와디즈 (현재 비활성) | `outbound_click` |
| **전 섹션** | 스크롤 노출 / 체류 | `section_view`, `section_dwell` |

---

## 4. 구현 아키텍처

```
index.html
   └─ gtag.js 스니펫 (GA4 로더)

src/lib/analytics.ts        ← 추적 헬퍼 (단일 진입점)
   ├─ initGA()              ← 측정 ID 초기화
   ├─ trackEvent(name, params)
   ├─ trackMenuClick(name)
   ├─ trackOutbound(label, url)
   └─ ...

src/hooks/useSectionTracking.ts   ← 섹션 노출 + 체류시간 측정 훅
   └─ IntersectionObserver 기반

각 컴포넌트
   ├─ onClick 핸들러에 trackEvent 호출 추가
   └─ 섹션 래퍼에 useSectionTracking("섹션명") 부착
```

### 설계 원칙
- **단일 진입점**: 모든 추적은 `analytics.ts`를 거치게 하여 이벤트 이름/파라미터 일관성 확보
- **환경변수 가드**: `VITE_GA_ID`가 없으면 추적 호출을 무시(개발 환경 노이즈 방지)
- **타입 안전**: 이벤트 이름과 파라미터를 TypeScript 타입으로 정의
- **기존 코드 최소 침습**: 기존 스크롤/클릭 로직은 그대로 두고 추적 한 줄만 추가

---

## 5. 단계별 구현 계획

### Phase 0 — GA4 준비 (사용자/관리자 작업)
- [ ] GA4 속성 생성 및 측정 ID 발급
- [ ] Amplify 환경변수 `VITE_GA_ID` 등록

### Phase 1 — 기반 구축
- [ ] `index.html`에 gtag.js 스니펫 삽입 (측정 ID는 런타임 주입 방식 또는 헬퍼 초기화)
- [ ] `src/lib/analytics.ts` 작성 — `initGA`, `trackEvent`, 도메인별 헬퍼
- [ ] `src/main.tsx`에서 `initGA()` 호출
- [ ] TypeScript용 `gtag` 전역 타입 선언 (`src/vite-env.d.ts` 또는 별도 d.ts)

### Phase 2 — 클릭 이벤트 연결
- [ ] `Navbar.tsx` — 메뉴 3종 + SHOP/INSTAGRAM/로고/모바일 토글
- [ ] `HeroSlider.tsx` — 썸네일 클릭
- [ ] `Stories.tsx` — 아코디언 토글
- [ ] `ProductSection.tsx` — 제품 카드 클릭(제품명 파라미터 포함)
- [ ] `FloatingCart.tsx` — (활성화 시) 와디즈 전환

### Phase 3 — 스크롤/체류 추적
- [ ] `useSectionTracking` 훅 작성 (IntersectionObserver: 진입 시 `section_view`, 이탈 시 진입~이탈 시간차로 `section_dwell`)
- [ ] App의 각 섹션(Hero, BrandStatement, FirstSip, Stories, FullImage, ProductSection, ProductBanner)에 부착

### Phase 4 — 검증 및 배포
- [ ] GA4 **DebugView**로 로컬/스테이징에서 이벤트 수신 확인
- [ ] `npm run lint`(tsc) 통과 확인
- [ ] Amplify 재배포 후 실제 도메인에서 실시간 보고서 확인

### Phase 5 — 마케팅 리포트 구성 (GA4 콘솔 작업)
- [ ] **맞춤 이벤트**를 전환(Conversion)으로 지정 (예: `outbound_click` → 스토어 이동)
- [ ] **탐색(Exploration)** 보고서: 메뉴별/버튼별 클릭 수, 섹션별 노출·체류 분석
- [ ] (선택) Google Tag Manager 또는 Looker Studio 연동으로 시각화 고도화

---

## 6. 수집 이벤트 스키마 (초안)

| 이벤트명 | 파라미터 | 예시 |
|---|---|---|
| `menu_click` | `menu_name`, `device`(web/mobile) | `{menu_name:"stories", device:"web"}` |
| `outbound_click` | `label`, `url` | `{label:"shop_wadiz", url:"..."}` |
| `slider_thumb_click` | `index` | `{index:2}` |
| `accordion_toggle` | `section`, `state` | `{section:"stories", state:"open"}` |
| `product_click` | `product_name`, `index` | `{product_name:"...", index:0}` |
| `section_view` | `section` | `{section:"ProductSection"}` |
| `section_dwell` | `section`, `seconds` | `{section:"Stories", seconds:14}` |
| `ui_toggle` | `target`, `state` | `{target:"mobile_menu", state:"open"}` |

> 이벤트명/파라미터는 GA4 권장 규칙(snake_case, 40자 이내)을 따른다.

---

## 7. 예상 작업량 및 리스크

| 항목 | 내용 |
|---|---|
| **예상 변경 파일** | `index.html`, 신규 2개(`analytics.ts`, `useSectionTracking.ts`), 컴포넌트 4~6개 |
| **예상 난이도** | 낮음~중간 (체류시간 측정만 약간의 로직 필요) |
| **리스크 1 — 개인정보** | GA는 쿠키 사용 → **개인정보처리방침/쿠키 동의** 고지 필요 가능성 (한국 서비스 기준 검토 권장) |
| **리스크 2 — 환경변수** | Amplify 환경변수 미등록 시 데이터 미수집 → 빌드 후 DebugView로 반드시 확인 |
| **리스크 3 — 광고차단기** | 일부 사용자(AdBlock)는 gtag 차단 → 수집률 100% 아님(업계 공통, 무시 가능 수준) |

---

## 8. 다음 액션

1. **사용자**: GA4 속성 생성 → 측정 ID 확보 → Amplify 환경변수 등록
2. **개발(Claude)**: 측정 ID 준비되면 Phase 1~3 코드 구현 진행
3. **공동**: GA4 DebugView로 검증 → 재배포 → 마케팅 리포트 구성

---

### 부록: 라이브러리 선택
- **옵션 A (권장)**: gtag 직접 호출 + 자체 헬퍼 — 의존성 0, 가장 가벼움
- **옵션 B**: `react-ga4` 패키지 — API가 간결하나 의존성 1개 추가
- 본 계획서는 **옵션 A** 기준으로 작성됨
