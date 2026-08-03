import { products } from '../data/products'
import ProductCard from './ProductCard'

export default function ProductSection() {
  return (
    <section>
      <h2 className="section-title">처음이 더 즐거워지는 제품</h2>
      <div className="products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
