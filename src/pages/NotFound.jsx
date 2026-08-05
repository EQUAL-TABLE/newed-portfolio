import { Link } from 'react-router-dom'

// 없는 경로로 접근했을 때 보여주는 404 페이지.
export default function NotFound() {
  return (
    <main className="content notfound">
      <h2 className="section-title">페이지를 찾을 수 없습니다</h2>
      <p>요청하신 주소가 존재하지 않거나 이동되었습니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </main>
  )
}
