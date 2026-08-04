# NEWED GA4 / 전환 이벤트 정의서 (v2)

> 최초 작성: 2026-06-24 · **v2 갱신: 2026-08-04**
> 측정 ID: `G-LM5JB1XLHP` / 속성: newed_portfolio
> 코드: [src/lib/analytics.ts](../src/lib/analytics.ts) · [src/lib/naverConversion.ts](../src/lib/naverConversion.ts) · [src/hooks/useSectionTracking.ts](../src/hooks/useSectionTracking.ts)
> 용도: "코드상 이벤트/파라미터 ↔ 실제 의미" 매핑 참조

> ⚠️ **v1 → v2 변경 요약**: 판매 채널이 **와디즈 → 카카오 선물하기**로 바뀌었고, v2엔 STORIES 메뉴·슬라이더 썸네일·모바일 햄버거가 없습니다. 따라서 v1의 `shop_wadiz`·`slider_thumb_click`·모바일 `device` 파라미터는 폐기됐습니다. 제품 카드는 아코디언이 아니라 **상세페이지로 이동**합니다.

---

## 0. 전송 경로 (아키텍처)

| 채널 | 방식 | 초기화/로드 |
|---|---|---|
| **GA4** | `gtag()` 직접 호출 | 코드 `initGA()` (main.jsx). GTM엔 GA4 태그 없음 → 이중집계 없음 |
| **Meta** | `dataLayer.push({event, ...})` → GTM이 소비 | GTM `GTM-553DQ9ML` (index.html) |
| **Naver** | `wcs.trans()` | wcslog.js (index.html) |

모든 추적은 [analytics.ts](../src/lib/analytics.ts) 단일 진입점을 통과합니다. `VITE_GA_ID`가 없으면(로컬) GA4 호출은 무시되고, dataLayer/Naver는 정상 동작합니다.

---

## 1. GA4 커스텀 이벤트

| 이벤트 ID | 의미 / 발생 시점 | 발생 위치 |
|---|---|---|
| `page_view` | SPA 라우트 변경마다 전송(자동 page_view는 끔) | App(라우트 변경) |
| `menu_click` | 내부 내비게이션 클릭(로고/홈/브랜드/제품) | Header, Footer |
| `outbound_click` | 외부 사이트 이동(카카오/인스타) — **모든 전환성 이탈** | Header·IconList·Footer·InstaGrids·ProductDetail |
| `product_click` | 제품 카드 클릭 → 상세페이지 진입 | ProductCard |
| `view_content` | 클릭 없는 콘텐츠 조회(브랜드 페이지 진입) | Brand |
| `icon_click` | IconList 내부 아이콘(BEST) 클릭 | IconList |
| `hero_slide` | 히어로 슬라이더 수동 전환(화살표/스와이프) — 자동재생 제외 | Hero |
| `accordion_toggle` | 아코디언 열기/닫기(사업자정보) | Footer |
| `modal_open` | 모달 열기(개인정보처리방침) | Footer |
| `section_<섹션>` | 섹션 체류 1건(이탈 시 체류시간 포함) — 아래 3장 | 전 섹션(Home) |

---

## 2. 이벤트별 파라미터

### `page_view`
| 파라미터 | 의미 | 예시 |
|---|---|---|
| `page_path` | 경로 | `/brand`, `/products/deep` |
| `page_location` | 전체 URL | `https://www.newed.kr/brand` |
| `page_title` | 문서 타이틀 | (경로별 SEO 타이틀) |

### `menu_click`
| 파라미터 | 의미 | 값 |
|---|---|---|
| `menu_name` | 메뉴 이름 | `logo`, `home`, `brand`, `product` |
| `source` | 발생 위치 | `header`, `footer` |

### `outbound_click`  ← 전환 분석의 핵심
| 파라미터 | 의미 | 값 |
|---|---|---|
| `label` | 이동 종류 | `shop`(카카오), `instagram` |
| `source` | **발생 위치**(어디서 눌렀나) | shop: `icon`·`product_more`·`buybutton_deep`·`buybutton_bright`·`buybutton_decaf` / instagram: `header`·`icon`·`footer`·`feed` |
| `product_id` | 상품 | `deep`·`bright`·`decaf` (바로구매 버튼일 때) |
| `index` | 피드 순번 | `0`~ (instagram `feed`일 때) |
| `url` | 이동 URL | 목적지 |

> **"어디서 → 어디로" 분석**은 `label` × `source` (× `page_path`)로 분해합니다. 예: 홈 상단바 인스타(`label=instagram, source=header, page_path=/`) vs 브랜드 푸터 인스타(`source=footer, page_path=/brand`).

### `product_click`
| 파라미터 | 의미 | 값 |
|---|---|---|
| `product_name` | 제품명 | 뉴드 드립백 딥 에디션 … |
| `product_id` | 제품 id | `deep`·`bright`·`decaf` |
| `index` | 순번 | `0`(딥)·`1`(브라이트)·`2`(디카페인) |

### `view_content`
| 파라미터 | 의미 | 값 |
|---|---|---|
| `content_name` | 콘텐츠명 | `브랜드` |
| `source` | 유형 | `page` |

### 기타
| 이벤트 | 파라미터 | 값 |
|---|---|---|
| `icon_click` | `icon_name` | `best` |
| `hero_slide` | `direction`, `index` | `prev`/`next`, 슬라이드 인덱스 |
| `accordion_toggle` | `section`, `state` | `business_info`, `open`/`close` |
| `modal_open` | `target` | `privacy` |

---

## 3. 섹션 체류 추적 (`section_<섹션>`)

[useSectionTracking](../src/hooks/useSectionTracking.ts)이 Home의 각 섹션을 IntersectionObserver로 관찰합니다.

- **동작**: 섹션이 화면 50% 이상 보이면 진입 시각 기록 → 섹션을 벗어날 때 체류시간이 **1초 이상**이면 `section_<섹션>` 이벤트를 `seconds`와 함께 1회 전송. 1초 미만(스쳐 지나감)은 미전송. 재방문마다 재전송(왕복 동선 보존). 탭 전환/종료 시에도 정산.
- v1의 `section_view`+`section_dwell` 2개 이벤트를 **섹션별 단일 이벤트(체류시간 포함)**로 통합했습니다.

| 이벤트 이름 | 섹션(name) | 화면 영역 |
|---|---|---|
| `section_hero` | Hero | 히어로 슬라이더 |
| `section_icons` | Icons | 아이콘(카테고리) 3개 |
| `section_product_section` | ProductSection | 제품 카드 |
| `section_promo_banner` | PromoBanner | 프로모션 배너(615) |
| `section_instagram` | Instagram | 인스타 피드 그리드 |
| `section_main_image` | MainImage | 하단 고정 이미지 |
| `section_footer` | Footer | 푸터 |

공통 파라미터: `section`(섹션명), `seconds`(체류 초, 정수).

> 섹션 추적은 **Home에서만** 활성화됩니다(브랜드/상세 페이지는 미부착).

---

## 4. 전환(Conversion) 매핑 — Meta / Naver

GA4 이벤트와 별개로, 전환 시점에 dataLayer/Naver로도 전송됩니다. (코드에서 GA4·Meta·Naver 동시 발화)

| 전환 | 발생 지점 | dataLayer 이벤트 | Meta 표준 | Naver 타입 |
|---|---|---|---|---|
| 구매의도 | 카카오 아이콘·제품 더 알아보기(`product_more`)·바로구매 버튼 | `conversion_shop` | Lead | `lead` |
| 문의 | 이벤트 메뉴·인스타 아이콘·Footer 인스타·피드 | `conversion_instagram` | Contact | `custom001` |
| 콘텐츠조회 | 제품 카드 클릭·브랜드 페이지 조회 | `conversion_content` | ViewContent | `view_content` |

dataLayer 전달 파라미터: `source`(위치, 상세버튼은 `buybutton_<id>`), `product_id`, `url`, `content_name`(콘텐츠조회). Meta 태그 매핑·검증은 [Meta-데이터세트-연동가이드](Meta-데이터세트-연동가이드.md) 참조.

---

## 5. 자동 수집 이벤트 (GA4 향상된 측정 — 코드 아님)

`session_start`·`first_visit`·`user_engagement`·`scroll`(90%) 등은 GA4가 자동 수집합니다. 우리 `section_<섹션>`은 기본 `scroll`보다 세밀한 섹션 단위 추적이므로 마케팅 분석은 이쪽을 사용하세요. (SPA라 GA4 자동 `page_view`는 끄고 `trackPageView`로 라우트마다 직접 전송)

---

## 6. GA4 맞춤 정의 등록 (배포 후 콘솔 작업, 소급 안 됨)

**관리(Admin) → 맞춤 정의(Custom definitions)** 에 등록해야 탐색(Explore)에서 항목으로 조회됩니다.

| 파라미터 | 등록 유형 | 권장 이름 | 용도 |
|---|---|---|---|
| `source` | 맞춤 측정기준 | source | 클릭/전환 발생 위치 분석 |
| `product_id` | 맞춤 측정기준 | product_id | 상품별 관심/구매의도 |
| `label` | 맞춤 측정기준 | outbound_label | shop/instagram 구분 |
| `menu_name` | 맞춤 측정기준 | menu_name | 메뉴별 클릭 |
| `section` | 맞춤 측정기준 | section | 섹션별 분류 |
| `seconds` | 맞춤 측정항목 | dwell_seconds | 체류시간 합계/평균 |

---

## 7. 분석 활용 예시

| 알고 싶은 것 | 이벤트 | 측정기준 | 측정항목 |
|---|---|---|---|
| 홈 상단바 vs 브랜드 푸터 인스타 이탈 | `outbound_click`(label=instagram) | `source` × `page_path` | 이벤트 수 |
| 상품별 바로구매 클릭(deep/bright/decaf) | `outbound_click`(label=shop) | `product_id` | 이벤트 수 |
| 인기 제품(카드 클릭) | `product_click` | `product_id` | 이벤트 수 |
| 어느 섹션에서 오래 머무나 | `section_<섹션>` | `section` | `dwell_seconds` 평균 |
| 카카오 전환 경로별 비중 | `outbound_click`(label=shop) | `source` | 이벤트 수 |

---

### 참고
- 코드 단일 진입점: [analytics.ts](../src/lib/analytics.ts)
- 추적 토폴로지(GTM/GA4 구조): 프로젝트 메모리 `gtm-ga4-topology`
- 실시간 검증: GA4 DebugView / 실시간 · 누적: 탐색(Explore, 24~48h 지연)
