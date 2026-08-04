import { products } from '../data/products'
import ProductCard from './ProductCard'

export default function ProductSection() {
  return (
    <section id="products">
      <h2 className="section-title">처음이 더 즐거워지는 제품</h2>
      <div className="products">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}
