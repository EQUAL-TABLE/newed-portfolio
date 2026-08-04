import { Link } from 'react-router-dom'
import { trackProductClick } from '../lib/analytics'

export default function ProductCard({ product, index }) {
  return (
    <Link
      className="product"
      to={`/products/${product.id}`}
      onClick={() => trackProductClick(product.name, product.id, index)}
    >
      <img className="thumb" src={product.thumbImg} alt={product.name} />
      <div className="badge">{product.badge}</div>
      <div className="name">{product.name}</div>
      <div className="price">{product.price}</div>
    </Link>
  )
}
