import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link className="product" to={`/products/${product.id}`}>
      <img className="thumb" src={product.thumbImg} alt={product.name} />
      <div className="badge">{product.badge}</div>
      <div className="name">{product.name}</div>
      <div className="price">{product.price}</div>
    </Link>
  )
}
