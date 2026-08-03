import '../css/home.css'
import Hero from '../components/Hero'
import IconList from '../components/IconList'
import ProductSection from '../components/ProductSection'
import Banner from '../components/Banner'
import InstaGrids from '../components/InstaGrids'

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

      <Banner label="656*210" full />
    </>
  )
}
