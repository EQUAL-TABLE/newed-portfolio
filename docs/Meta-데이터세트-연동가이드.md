# Meta 데이터 세트(픽셀) 연동 가이드 — GTM 설정 (v2)

> 최초 작성: 2026-06 · **v2 갱신: 2026-08-04**

repo 코드의 **전환 이벤트**가 Meta 데이터 세트(Newed, ID `1821069195538379`)에 잡히도록 하는 GTM 설정입니다.

- **GTM 컨테이너:** `GTM-553DQ9ML` (index.html 로드)
- **데이터 세트/픽셀 ID:** `1821069195538379`
- **웹사이트:** https://www.newed.kr

> ✅ **현재 상태(2026-08 확인): GTM 설정은 이미 완료돼 있습니다.** 아래 태그·트리거·변수가 구성돼 있어, 코드가 dataLayer로 전환을 push하면 바로 소비됩니다. 이 문서는 (1) 무엇이 어떻게 구성돼 있는지 참조, (2) v2 전환 매핑, (3) 위치·상품별 분석 방법을 위한 것입니다.

---

## 0. v1 → v2 변경

- 판매 채널 **와디즈 → 카카오 선물하기**. `conversion_shop`은 이제 카카오 선물하기 이동을 의미.
- v2엔 **STORIES 메뉴 없음.** `conversion_content`(ViewContent)는 **제품 카드 클릭 + 브랜드 페이지 조회**로 재정의.
- dataLayer 파라미터에 `source`(발생 위치), `product_id`(상품)가 추가되어 위치·상품별 분해가 가능.

| dataLayer 이벤트 | 발생 시점(v2) | Meta 표준 |
|---|---|---|
| `conversion_shop` | 제품 메뉴·카카오 아이콘·상세 바로구매 버튼 | **Lead** |
| `conversion_instagram` | 이벤트 메뉴·인스타 아이콘·Footer 인스타·피드 | **Contact** |
| `conversion_content` | 제품 카드 클릭·브랜드 페이지 조회 | **ViewContent** |

전달 파라미터: `source`(위치 라벨; 상세버튼은 `buybutton_<id>`), `product_id`, `url`, `content_name`(콘텐츠조회 시 제품명/`브랜드`).

---

## 1. 구성 현황 (이미 존재)

**태그 4개** (GTM > 태그):

| 태그 | 유형 | 트리거 |
|---|---|---|
| `Meta Pixel ID 1821069195538379` | 맞춤 HTML | All Pages (fbq init + PageView) |
| `Meta - Lead (shop)` | 맞춤 HTML | `CE - conversion_shop` |
| `Meta - Contact (instagram)` | 맞춤 HTML | `CE - conversion_instagram` |
| `Meta - ViewContent (content)` | 맞춤 HTML | `CE - conversion_content` |

> 전환 태그가 **DOM 클릭이 아니라 맞춤이벤트(CE) 트리거**로 발화하므로, 이벤트당 태그 1개 → **중복집계가 구조적으로 없습니다.**

**데이터 영역 변수 3개** (GTM > 변수):

| 변수 이름 | 데이터 영역 변수 이름(리터럴) |
|---|---|
| `dlv.source` | `source` |
| `dlv.url` | `url` |
| `dlv.content_name` | `content_name` |

> ⚠️ **주의:** 데이터 영역 변수 이름은 반드시 코드가 push하는 **리터럴 키**(`source`/`url`/`content_name`)와 일치해야 합니다. 과거 표시명("Content Name")을 넣어 전환이 0으로 잡힌 이슈가 있었습니다(해결됨). 새 변수 추가 시 동일 주의.

**맞춤 이벤트 트리거 3개**: `CE - conversion_shop`, `CE - conversion_instagram`, `CE - conversion_content` (이벤트 이름 정확히 일치, 정규식 아님).

---

## 2. 전환 태그 내용 (참조)

각 맞춤 HTML 태그가 담고 있는 fbq 호출(기본 픽셀로 `fbq`는 이미 로드됨):

```html
<!-- Meta - Lead (shop) : 트리거 CE - conversion_shop -->
<script>fbq('track', 'Lead', { content_name: {{dlv.source}}, source_url: {{dlv.url}} });</script>

<!-- Meta - Contact (instagram) : 트리거 CE - conversion_instagram -->
<script>fbq('track', 'Contact', { content_name: {{dlv.source}}, source_url: {{dlv.url}} });</script>

<!-- Meta - ViewContent (content) : 트리거 CE - conversion_content -->
<script>fbq('track', 'ViewContent', { content_name: {{dlv.content_name}} });</script>
```

- Lead/Contact의 `content_name`은 **`{{dlv.source}}`**(발생 위치). 따라서:
  - Contact: `header`·`icon`·`footer`·`feed`
  - Lead: `menu`·`icon`·`buybutton_deep`·`buybutton_bright`·`buybutton_decaf` → **상품이 content_name에 그대로 들어옴** → GTM 변경 없이 상품 구분 가능.
- 페이지(홈/브랜드 등) 구분은 Meta가 이벤트 발생 URL을 자동 기록하므로 URL 기준으로 가능.

---

## 3. 위치·상품별 분석 — "맞춤 전환(Custom Conversion)" 만들기

Meta 기본 리포트는 표준 이벤트를 커스텀 파라미터로 자동 분해하지 않습니다. 위치/상품별로 쪼개 보려면 **이벤트관리자 > 맞춤 전환**에서 규칙을 만듭니다.

예시:

| 알고 싶은 것 | 맞춤 전환 규칙 |
|---|---|
| 브랜드 푸터에서 인스타 문의 | 이벤트 `Contact` **그리고** `content_name = footer` **그리고** URL에 `/brand` 포함 |
| 홈 상단바에서 인스타 문의 | 이벤트 `Contact` **그리고** `content_name = header` **그리고** URL `newed.kr/` |
| 딥 에디션 구매의도 | 이벤트 `Lead` **그리고** `content_name` 에 `deep` 포함 |
| 상세 바로구매 전체 | 이벤트 `Lead` **그리고** `content_name` 에 `buybutton` 포함 |

> 깊은 분해 분석(상품×위치×페이지)은 **GA4가 주력**입니다(파라미터 기반). Meta는 전환 카운트 + 광고 최적화(위 맞춤 전환을 광고 최적화 목표로 사용)로 활용하세요.

---

## 4. 검증

1. GTM **미리보기** → https://www.newed.kr 연결 (Tag Assistant).
2. SHOP(카카오)·INSTAGRAM·제품 카드·브랜드 페이지 진입·바로구매를 각각 수행.
3. 좌측 이벤트에 `conversion_shop/instagram/content`가 뜨고 대응 Meta 태그가 **Fired**인지 확인. 변수 값(`source`/`content_name`)도 확인.
4. Meta 이벤트관리자 **테스트 이벤트**에서 Lead/Contact/ViewContent 실시간 수신 확인.
5. **중복집계 검증(필수):** 한 번 클릭에 표준 이벤트가 **정확히 1건**인지 확인. 2건이면 Meta 이벤트관리자의 "이벤트 설정 도구" 클릭룰 등 **GTM 밖 경로**가 남아있는지 점검(있으면 비활성화).

---

## 5. 게시

미리보기 확인 후 GTM **제출 > 게시**. 데이터 세트 개요 반영까지 최대 30분.

---

## 6. 참고 — 매칭 품질

이 랜딩은 이메일/전화 입력 폼이 없어 고급 매칭 식별자가 적습니다(실 구매는 카카오에서 발생). 이 사이트에서 잡히는 최대치는 "구매의도(Lead)"까지입니다. 향후 전환 API(서버 전송) + `event_id` 중복제거가 정석(현재 범위 밖).

---

## 관련
- 전환 발화 코드: [src/lib/analytics.ts](../src/lib/analytics.ts) (`META_CONVERSION_EVENT`, `trackShopClick`, `trackInstagramClick`, `trackProductClick`, `trackContentView`)
- 이벤트/파라미터 정의: [GA4-이벤트정리](GA4-이벤트정리.md)
- GTM/GA4 토폴로지: 프로젝트 메모리 `gtm-ga4-topology`
- GTM 스니펫: [index.html](../index.html)
