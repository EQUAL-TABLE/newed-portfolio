/**
 * Instagram API(Instagram Login) 장기 액세스 토큰을 갱신합니다.
 * 장기 토큰은 60일 후 만료되므로, 주기적으로 갱신해 만료를 방지합니다.
 * (갱신은 토큰이 최소 24시간 이상 지난 뒤부터 가능합니다.)
 *
 * .github/workflows/instagram-token-refresh.yml 에서 주 1회 실행되며,
 * 갱신된 새 토큰을 GITHUB_OUTPUT(token)으로 내보내
 * 워크플로가 IG_ACCESS_TOKEN 시크릿을 자동 업데이트합니다.
 *
 * 필요한 환경변수: IG_ACCESS_TOKEN (현재 유효한 장기 토큰)
 */
import { appendFile } from "node:fs/promises";

const TOKEN = process.env.IG_ACCESS_TOKEN;
if (!TOKEN) {
  console.error("환경변수 IG_ACCESS_TOKEN 가 필요합니다.");
  process.exit(1);
}

const url =
  "https://graph.instagram.com/refresh_access_token" +
  `?grant_type=ig_refresh_token&access_token=${TOKEN}`;

const res = await fetch(url);
const json = await res.json().catch(() => ({}));

if (!res.ok || !json.access_token) {
  console.error(`토큰 갱신 실패 ${res.status}: ${JSON.stringify(json)}`);
  process.exit(1);
}

const days = Math.round((json.expires_in || 0) / 86400);
console.log(`토큰 갱신 성공. 만료까지 약 ${days}일.`);
// 로그에 새 토큰이 노출되지 않도록 마스킹
console.log(`::add-mask::${json.access_token}`);

if (process.env.GITHUB_OUTPUT) {
  await appendFile(process.env.GITHUB_OUTPUT, `token=${json.access_token}\n`);
}
