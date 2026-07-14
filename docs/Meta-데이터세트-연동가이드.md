# Meta 데이터 세트(픽셀) 연동 가이드 — GTM 설정

repo 코드에서 발생하는 **전환 이벤트**가 Meta 광고 관리자 > 데이터 세트(Newed, ID
`1821069195538379`)에 잡히도록 GTM을 설정하는 절차입니다.

- **GTM 컨테이너:** `GTM-553DQ9ML` (index.html에서 로드)
- **데이터 세트/픽셀 ID:** `1821069195538379`
- **웹사이트:** https://www.newed.kr

---

## 0. 배경 — 왜 지금은 repo 이벤트가 안 잡혔나

repo의 모든 추적은 `gtag("event", ...)`로 나가며, 이는 dataLayer에 `arguments` 객체를
넣습니다. **GTM의 "맞춤 이벤트(Custom Event)" 트리거는 `{ event: '...' }` 객체만
인식**하므로 gtag 이벤트로는 GTM 태그를 붙일 수 없었습니다. 그래서 지금까지 Meta에는
GTM UI에서 DOM 클릭으로 대충 잡은 4개(PageView/콘텐츠조회/잠재고객/문의)만
들어오고 있었습니다.

이를 해결하기 위해 [src/lib/analytics.ts](../src/lib/analytics.ts)에 **GTM 전용
dataLayer 전환 이벤트**를 추가했습니다. 아래 3개 이벤트가 전환 시점에 push됩니다.

| dataLayer 이벤트 이름 | 발생 시점 | 매핑할 Meta 표준 이벤트 |
|---|---|---|
| `conversion_shop` | 와디즈 SHOP 버튼 클릭 (Navbar/배너/제품상세/플로팅카트) | **Lead** |
| `conversion_instagram` | 인스타그램 이동 클릭 (Navbar/피드) | **Contact** |
| `conversion_content` | STORIES 메뉴 클릭 · 제품 카드 열기 | **ViewContent** |

함께 전달되는 파라미터: `source`(발생 위치 라벨), `url`(이동 URL, shop/instagram),
`content_name`(콘텐츠명, content).

> **⚠️ 중복집계 방지가 이 작업의 핵심입니다.** 지금 Meta에 Lead/Contact/ViewContent를
> 넣고 있는 기존 방식(대개 DOM 클릭 트리거)을 그대로 둔 채 새 태그를 "추가"하면 같은
> 전환이 두 번 잡힙니다. 아래 4단계는 **새 태그를 만드는 게 아니라, 기존 태그의 트리거를
> 새 맞춤 이벤트로 갈아끼우는(repoint) 방식**을 기본으로 합니다. 이러면 이벤트당 태그가
> 1개로 유지되어 중복이 구조적으로 불가능합니다. (코드/ GA4 / 네이버와는 전혀 무관한,
> Meta 데이터 세트 한정 이슈입니다.)

---

## 1. Meta 픽셀 기본 태그 확인

PageView가 이미 1.1만건 잡히고 있으므로 **기본 픽셀(fbq init + PageView)** 태그는 이미
GTM에 존재합니다. 즉 `fbq`는 전 페이지에서 초기화되어 있습니다. 아래 전환 태그들은
이 `fbq`를 그대로 사용합니다. (없다면 먼저 Meta 기본 픽셀 태그를 All Pages로 만드세요.)

---

## 2. 데이터 영역 변수(Data Layer Variable) 생성

GTM > **변수 > 사용자 정의 변수 > 새로 만들기 > 데이터 영역 변수**로 3개 생성:

| 변수 이름 | 데이터 영역 변수 이름 |
|---|---|
| `dlv.source` | `source` |
| `dlv.url` | `url` |
| `dlv.content_name` | `content_name` |

버전은 기본값(버전 2) 그대로 둡니다.

---

## 3. 맞춤 이벤트 트리거 생성

GTM > **트리거 > 새로 만들기 > 맞춤 이벤트**로 3개 생성. "이벤트 이름"에 아래 값을
정확히 입력(정규식 아님):

| 트리거 이름 | 이벤트 이름 |
|---|---|
| `CE - conversion_shop` | `conversion_shop` |
| `CE - conversion_instagram` | `conversion_instagram` |
| `CE - conversion_content` | `conversion_content` |

---

## 4. Meta 픽셀 전환 태그 — 중복 없이 연결하기

**먼저 GTM > 태그에서 지금 Lead / Contact / ViewContent를 쏘고 있는 기존 태그를 찾습니다.**
(Meta 픽셀 템플릿 태그거나, `fbq('track', 'Lead' ...)` 형태의 맞춤 HTML일 가능성이 높습니다.
어떤 트리거로 발화하는지 각 태그의 "트리거" 섹션에서 확인하세요.)

- **케이스 A — 기존 태그가 있으면(권장): 트리거만 교체.**
  기존 태그를 열어 현재 트리거(예: DOM 클릭)를 **제거**하고, 3단계에서 만든 대응
  맞춤 이벤트 트리거로 **바꿔 끼웁니다.** 태그 내용(fbq track)은 그대로 두면 됩니다.
  → 태그가 1개로 유지되므로 중복집계가 원천 차단됩니다.

  | 기존 태그(이벤트) | 새로 지정할 트리거 |
  |---|---|
  | Lead | `CE - conversion_shop` |
  | Contact | `CE - conversion_instagram` |
  | ViewContent | `CE - conversion_content` |

  이 경우 아래 4-1~4-3의 "새 태그 만들기"는 **건너뜁니다.** 파라미터(content_name 등)를
  추가하고 싶으면 기존 태그의 이벤트 속성에 3-4단계 변수만 매핑하면 됩니다.

- **케이스 B — 기존 태그가 없거나 자동수집(브라우저 자동 이벤트)이면: 새로 만들되 기존 경로 차단.**
  아래 4-1~4-3처럼 맞춤 HTML 태그를 새로 만들고, **기존에 같은 이벤트를 만들던 경로(예:
  Meta Events Manager의 "이벤트 설정 도구"로 만든 클릭 규칙, 또는 GTM의 기존 클릭 트리거)를
  반드시 비활성화/삭제**하세요. 그러지 않으면 새 태그와 기존 경로가 동시에 잡혀 중복됩니다.

> 아래 4-1~4-3은 **케이스 B(신규 생성)** 또는 케이스 A에서 태그를 새로 짜고 싶을 때의
> 스니펫입니다. `fbq`는 기본 픽셀로 이미 로드돼 있으므로 맞춤 HTML로 표준 이벤트만
> 쏘면 됩니다. GTM > **태그 > 새로 만들기 > 맞춤 HTML**.

### 4-1. Lead (와디즈 SHOP)
- **태그 이름:** `Meta - Lead (shop)`
- **HTML:**
  ```html
  <script>
    fbq('track', 'Lead', {
      content_name: {{dlv.source}},
      source_url: {{dlv.url}}
    });
  </script>
  ```
- **트리거:** `CE - conversion_shop`

### 4-2. Contact (인스타그램)
- **태그 이름:** `Meta - Contact (instagram)`
- **HTML:**
  ```html
  <script>
    fbq('track', 'Contact', {
      content_name: {{dlv.source}},
      source_url: {{dlv.url}}
    });
  </script>
  ```
- **트리거:** `CE - conversion_instagram`

### 4-3. ViewContent (STORIES/제품)
- **태그 이름:** `Meta - ViewContent (content)`
- **HTML:**
  ```html
  <script>
    fbq('track', 'ViewContent', {
      content_name: {{dlv.content_name}}
    });
  </script>
  ```
- **트리거:** `CE - conversion_content`

> 대안: Meta 공식 "Facebook Pixel" 커뮤니티 템플릿을 써도 됩니다. 그 경우 태그 유형을
> "Track Event"로 두고 Event Name에 표준 이벤트를, Object Properties에 위 파라미터를
> 매핑하면 됩니다. 결과는 동일합니다.

---

## 5. 미리보기(Preview)로 검증

1. GTM 우측 상단 **미리보기** → `https://www.newed.kr` 입력해 Tag Assistant 연결.
2. 사이트에서 **SHOP / INSTAGRAM 클릭, STORIES 메뉴 클릭, 제품 카드 열기**를 각각 수행.
3. Tag Assistant 좌측 이벤트 목록에 `conversion_shop` / `conversion_instagram` /
   `conversion_content`가 뜨고, 해당 Meta 태그가 **Fired(발화됨)** 인지 확인.
4. Meta 광고 관리자 > 데이터 세트 > **이벤트 테스트(Test events)** 탭에서 브라우저로
   사이트를 열고 클릭하면 Lead/Contact/ViewContent가 실시간으로 들어오는지 확인.
5. **중복집계 검증 (필수):** 위 4번에서 **한 번의 클릭에 Meta 표준 이벤트가 정확히 1건만**
   들어오는지 확인합니다. 같은 동작에 Lead가 2건 뜬다면 기존 경로가 아직 살아있는 것이므로,
   Tag Assistant에서 어떤 태그들이 함께 발화했는지 보고 4단계로 돌아가 나머지 경로를
   제거하세요. (GA4·네이버는 이 테스트와 무관하게 그대로 동작합니다.)

---

## 6. 게시(Publish)

미리보기에서 정상 확인되면 GTM **제출 > 게시**. 데이터 세트 개요에 이벤트가 반영되기까지
최대 30분 소요될 수 있습니다.

---

## 7. 참고 — 이벤트 매칭 품질("업데이트 권장됨" 6.1/10)

- 이 랜딩 페이지는 **이메일/전화 등 개인정보 입력 폼이 없어** 고급 매칭에 넣을 고객
  식별자가 거의 없습니다. 실제 구매/결제는 와디즈에서 일어나므로 이 사이트에서 잡히는
  최대치는 "구매 의도(Lead)"까지입니다.
- 매칭 품질을 올리려면 데이터 세트 > 설정에서 **자동 고급 매칭**을 켜두고, 향후 전환
  API(서버 전송)를 붙일 때 `event_id`로 브라우저/서버 이벤트를 중복 제거하는 방식이
  정석입니다. (현재 범위 밖 — 필요 시 별도 진행)

---

## 관련 코드

- 전환 이벤트 정의/발화: [src/lib/analytics.ts](../src/lib/analytics.ts)
  (`META_CONVERSION_EVENT`, `pushDataLayerEvent`, `trackOutbound`, `trackMenuClick`,
  `trackProductClick`)
- GTM 스니펫: [index.html](../index.html)
