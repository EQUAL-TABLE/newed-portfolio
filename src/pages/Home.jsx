import '../css/home.css'
import Hero from '../components/Hero'
import IconList from '../components/IconList'
import ProductSection from '../components/ProductSection'
import Banner from '../components/Banner'
import InstaGrids from '../components/InstaGrids'
import Seo from '../components/Seo'
import { seoHome } from '../data/seo'
import { useSectionTracking } from '../hooks/useSectionTracking'
import mainImage from '../assets/images/main-1-656-480.png'

// 섹션 노출/체류 추적 대상 (DOM id ↔ GA4 섹션 이름). 참조 안정화를 위해 컴포넌트 밖에 둠.
const SECTIONS = [
  { id: 'hero', name: 'Hero' },
  { id: 'icons', name: 'Icons' },
  { id: 'products', name: 'ProductSection' },
  { id: 'promo_banner', name: 'PromoBanner' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'main_image', name: 'MainImage' },
  { id: 'footer', name: 'Footer' },
]

export default function Home() {
  useSectionTracking(SECTIONS)

  return (
    <>
      <Seo {...seoHome} />
      <main className="content">
        <Hero />
        <IconList />
        <ProductSection />
        <Banner id="promo_banner" />
        <InstaGrids />
      </main>

      {/* 하단 고정 이미지 (배너 아님) — .page 전체 폭(656) */}
      <img className="main-fixed" src={mainImage} alt="뉴드" id="main_image" />
    </>
  )
}
