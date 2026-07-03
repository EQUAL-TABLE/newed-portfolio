# NEWED GA4 이벤트 정의서

> 작성일: 2026-06-24
> 측정 ID: `G-LM5JB1XLHP` / 속성: newed_portfolio
> 코드 위치: [src/lib/analytics.ts](../src/lib/analytics.ts)
> 용도: 마케팅 분석 시 "코드상 이벤트 ID ↔ 실제 의미" 매핑 참조

---

## 1. 커스텀 이벤트 (우리가 직접 구현한 이벤트)

| 이벤트 ID (코드) | 한글 명칭 | 의미 / 발생 시점 | 발생 위치 |
|---|---|---|---|
| `menu_click` | 메뉴 클릭 | 상단바 내부 메뉴/로고를 눌러 섹션으로 이동 | Navbar |
| `outbound_click` | 외부링크 클릭(전환) | 와디즈 스토어·인스타그램 등 외부 사이트로 이탈 | Navbar (SHOP/INSTAGRAM) |
| `ui_toggle` | UI 토글 | 모바일 햄버거 메뉴 열기/닫기 | Navbar (모바일) |
| `slider_thumb_click` | 슬라이더 썸네일 클릭 | 메인 히어로 슬라이더의 썸네일(슬라이드 전환) 클릭 | HeroSlider |
| `accordion_toggle` | 아코디언 토글 | STORIES "MORE" 더보기 열기/닫기 | Stories |
| `product_click` | 제품 카드 클릭 | 제품 카드를 눌러 상세 아코디언 열기/닫기 | ProductSection |
| `section_view` | 섹션 노출(스크롤 도달) | 스크롤하여 해당 섹션이 화면 50% 이상 보임 (세션당 1회) | 전 섹션 (App) |
| `section_dwell` | 섹션 체류시간 | 해당 섹션에 머문 시간(초). 이탈/탭전환/페이지종료 시 전송 | 전 섹션 (App) |

---

## 2. 이벤트별 파라미터 상세

### `menu_click` — 메뉴 클릭
| 파라미터 | 한글 의미 | 값(예시) |
|---|---|---|
| `menu_name` | 메뉴 이름 | `homepage`(홈), `stories`(스토리), `product`(제품), `logo`(로고) |
| `device` | 접속 형태 | `web`(데스크탑 가로메뉴), `mobile`(모바일 드롭다운) |

### `outbound_click` — 외부링크 클릭(전환)
| 파라미터 | 한글 의미 | 값(예시) |
|---|---|---|
| `label` | 대상 라벨 | `shop_wadiz`(와디즈 스토어), `instagram`(인스타그램) |
| `url` | 이동 URL | 실제 외부 URL 문자열 |

### `ui_toggle` — UI 토글
| 파라미터 | 한글 의미 | 값(예시) |
|---|---|---|
| `target` | 토글 대상 | `mobile_menu`(모바일 햄버거 메뉴) |
| `state` | 상태 | `open`(열림), `close`(닫힘) |

### `slider_thumb_click` — 슬라이더 썸네일 클릭
| 파라미터 | 한글 의미 | 값(예시) |
|---|---|---|
| `index` | 슬라이드 번호 | `0`~`5` (썸네일 6개) |

### `accordion_toggle` — 아코디언 토글
| 파라미터 | 한글 의미 | 값(예시) |
|---|---|---|
| `section` | 아코디언 위치 | `stories`(스토리 더보기) |
| `state` | 상태 | `open`(열림), `close`(닫힘) |

### `product_click` — 제품 카드 클릭
| 파라미터 | 한글 의미 | 값(예시) |
|---|---|---|
| `product_name` | 제품명 | `DEEP EDITION`, `BRIGHT EDITION`, `DECAF EDITION` |
| `index` | 제품 순번 | `0`(딥), `1`(브라이트), `2`(디카페인) |
| `state` | 상태 | `open`(상세 열림), `close`(상세 닫힘) |

### `section_view` — 섹션 노출
| 파라미터 | 한글 의미 | 값(섹션명) |
|---|---|---|
| `section` | 노출된 섹션 | `Hero`, `BrandStatement`, `FirstSip`, `Stories`, `FullImage`, `ProductSection`, `ProductBanner`, `Footer` |

### `section_dwell` — 섹션 체류시간
| 파라미터 | 한글 의미 | 값 |
|---|---|---|
| `section` | 체류한 섹션 | (위 `section_view`와 동일한 8개 섹션명) |
| `seconds` | 체류 시간(초) | 정수 (예: `14`) |

---

## 3. 섹션 ID ↔ 한글 명칭 매핑

`section` 파라미터 값(영문)과 실제 화면 영역의 대응표입니다.

| `section` 값 | 한글 명칭 | 화면 설명 |
|---|---|---|
| `Hero` | 메인 슬라이더 | 최상단 오렌지 배경 히어로 슬라이더 |
| `BrandStatement` | 브랜드 선언 | 브랜드 철학 선언 텍스트 |
| `FirstSip` | 퍼스트 십 | 파란 타이틀 + 크림 이미지 섹션 |
| `Stories` | 스토리 | 마르세유 헤리티지 스토리텔링 (MORE 아코디언) |
| `FullImage` | 전폭 이미지 | 선글라스/해변 전폭 브랜드 이미지 |
| `ProductSection` | 제품 섹션 | 3종 에디션 제품 카드 + 상세 |
| `ProductBanner` | 제품 배너 | 오렌지 배경 하단 제품 배너 |
| `Footer` | 푸터 | 하단 저작권/연락처/개인정보처리방침 |

---

## 4. 자동 수집 이벤트 (GA4 향상된 측정 — 코드 아님)

GA4의 "향상된 측정(Enhanced Measurement)" 기능이 자동으로 넣는 이벤트입니다. 우리가 구현한 게 아니지만 보고서에 함께 나타납니다.

| 이벤트 ID | 한글 명칭 | 의미 |
|---|---|---|
| `page_view` | 페이지 조회 | 페이지 최초 로드 (SPA라 1회) |
| `scroll` | 스크롤(90%) | 페이지 세로 90% 지점 도달 시 자동 1회 (`percent_scrolled: 90`) |
| `session_start` | 세션 시작 | 방문 세션 시작 |
| `first_visit` | 첫 방문 | 최초 방문자 |
| `user_engagement` | 사용자 참여 | 페이지 활성 참여 시간 집계 |

> 우리 `section_view`/`section_dwell`은 GA4 기본 `scroll`(90% 한 번)보다 훨씬 세밀한 **섹션 단위** 추적입니다. 마케팅 분석은 이쪽을 사용하세요.

---

## 5. GA4 분석을 위한 맞춤 정의 등록 필요 항목

아래 파라미터는 **관리(Admin) → 맞춤 정의(Custom definitions)** 에 등록해야 탐색(Explore) 보고서에서 항목으로 조회됩니다. **(등록 시점 이후 데이터부터 반영, 소급 안 됨)**

| 파라미터 | 등록 유형 | 권장 이름 | 범위 | 용도 |
|---|---|---|---|---|
| `section` | 맞춤 측정기준 | section | 이벤트 | 섹션별 분류 |
| `seconds` | 맞춤 측정항목 | dwell_seconds | 이벤트 | 체류시간 합계/평균 |
| `menu_name` | 맞춤 측정기준 | menu_name | 이벤트 | 메뉴별 클릭 분석 |
| `product_name` | 맞춤 측정기준 | product_name | 이벤트 | 제품별 관심도 |
| `label` | 맞춤 측정기준 | outbound_label | 이벤트 | 외부 전환 대상 분석 |
| `device` | 맞춤 측정기준 | device_type | 이벤트 | 웹/모바일 메뉴 사용 비교 |

---

## 6. 분석 활용 예시

| 알고 싶은 것 | 사용 이벤트 | 측정기준 | 측정항목 |
|---|---|---|---|
| 어떤 섹션까지 스크롤되나 | `section_view` | `section` | 이벤트 수 |
| 어느 섹션에서 오래 머무나 | `section_dwell` | `section` | `dwell_seconds` 평균 |
| 가장 많이 눌리는 메뉴 | `menu_click` | `menu_name` | 이벤트 수 |
| 인기 제품 | `product_click` | `product_name` | 이벤트 수 |
| 스토어/인스타 전환율 | `outbound_click` | `label` | 이벤트 수 / 총 사용자 |
| 웹 vs 모바일 사용 패턴 | `menu_click` | `device` | 이벤트 수 |

---

### 참고
- 코드 단일 진입점: [src/lib/analytics.ts](../src/lib/analytics.ts)
- 섹션 추적 훅: [src/hooks/useSectionTracking.ts](../src/hooks/useSectionTracking.ts)
- 실시간 검증: GA4 실시간(Realtime) / DebugView
- 누적 분석: GA4 탐색(Explore) — 24~48h 처리 지연
