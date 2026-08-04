import '../css/home.css'
import Hero from '../components/Hero'
import IconList from '../components/IconList'
import ProductSection from '../components/ProductSection'
import Banner from '../components/Banner'
import InstaGrids from '../components/InstaGrids'
import mainImage from '../assets/images/main-1-656-480.png'

export default function Home() {
  return (
    <>
      <main className="content">
        <Hero />
        <IconList />
        <ProductSection />
        <Banner label="615*210" />
        <InstaGrids />
      </main>

      {/* 하단 고정 이미지 (배너 아님) — .page 전체 폭(656) */}
      <img className="main-fixed" src={mainImage} alt="뉴드" />
    </>
  )
}
