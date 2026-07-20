/**
 * 인스타그램(newed_official) 최신 게시물 4개를 가져와
 *   1) 이미지를 public/instagram/post-N.webp 로 리사이즈+변환 저장
 *   2) 링크/대체텍스트 메타데이터를 src/data/instagramFeed.json 으로 저장
 * 합니다.
 *
 * GitHub Actions(.github/workflows/instagram-feed.yml)에서 1시간마다 실행되며,
 * 변경이 있을 때만 커밋되어 Amplify가 자동 재배포합니다.
 *
 * 필요한 환경변수(GitHub Secrets):
 *   IG_ACCESS_TOKEN - Instagram API(Instagram Login) 장기 액세스 토큰
 *   IG_USER_ID      - Instagram 비즈니스 계정 User ID
 *
 * 로컬 테스트: IG_ACCESS_TOKEN=... IG_USER_ID=... node scripts/fetch-instagram.mjs
 */
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const API_VERSION = "v23.0";
const POST_COUNT = 4;
// 노출 위치가 모바일 2x2 그리드(셀 ~380px)라 2배 해상도인 800px면 충분합니다.
// 큰 원본을 그대로 쓰면 렌더 버벅임(jank)이 생기므로 리사이즈합니다.
const IMG_WIDTH = 800;
const WEBP_QUALITY = 80;

const TOKEN = process.env.IG_ACCESS_TOKEN;
const USER_ID = process.env.IG_USER_ID;

if (!TOKEN || !USER_ID) {
  console.error("환경변수 IG_ACCESS_TOKEN, IG_USER_ID 가 모두 필요합니다.");
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG_DIR = path.join(ROOT, "public", "instagram");
const DATA_FILE = path.join(ROOT, "src", "data", "instagramFeed.json");

/** 캡션을 alt 텍스트용 한 줄로 정리 */
function toAlt(caption) {
  const text = (caption || "").replace(/\s+/g, " ").trim();
  if (!text) return "newed_official 인스타그램 게시물";
  return text.slice(0, 120);
}

async function main() {
  const fields =
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const apiUrl =
    `https://graph.instagram.com/${API_VERSION}/${USER_ID}/media` +
    `?fields=${fields}&limit=${POST_COUNT}&access_token=${TOKEN}`;

  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`Instagram API 오류 ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  const media = (json.data || []).slice(0, POST_COUNT);
  if (media.length === 0) {
    throw new Error("가져온 게시물이 없습니다. 토큰/권한을 확인하세요.");
  }

  await mkdir(IMG_DIR, { recursive: true });
  await mkdir(path.dirname(DATA_FILE), { recursive: true });

  const posts = [];
  for (let i = 0; i < media.length; i++) {
    const m = media[i];
    // 동영상/릴스는 media_url 대신 썸네일을 사용
    const srcUrl =
      m.media_type === "VIDEO" ? m.thumbnail_url || m.media_url : m.media_url;
    if (!srcUrl) {
      throw new Error(`이미지 URL이 없습니다 (id=${m.id}, type=${m.media_type})`);
    }

    const imgRes = await fetch(srcUrl);
    if (!imgRes.ok) {
      throw new Error(`이미지 다운로드 실패 ${imgRes.status}: ${srcUrl}`);
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const fileName = `post-${i + 1}.webp`;
    await sharp(buf)
      .resize({ width: IMG_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(path.join(IMG_DIR, fileName));

    posts.push({
      img: `/instagram/${fileName}`,
      link: m.permalink,
      alt: toAlt(m.caption),
    });
  }

  const out = { updatedAt: new Date().toISOString(), posts };
  await writeFile(DATA_FILE, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`완료: 게시물 ${posts.length}개, 이미지 ${IMG_DIR}`);
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});
