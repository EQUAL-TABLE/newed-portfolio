// 재사용 배너: full=false 이면 콘텐츠 폭(615), full=true 이면 전체 폭(656)
export default function Banner({ label, full = false }) {
  return <div className={`box ${full ? 'banner-full' : 'banner'}`}>{label}</div>
}
