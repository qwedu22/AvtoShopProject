import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product, view = 'grid' }) {
  const { add } = useCart()
  return (
    <div className={`product product--${view}`}>
      <Link to={`/product/${product.id}`} className="product__thumb">
        <img
          src={product.images?.[0] || '/images/no-image.png'}
          alt={product.title}
          loading="lazy"
        />
      </Link>
      <div className="product__info">
        <Link to={`/product/${product.id}`} className="product__title">
          {product.title}
        </Link>
        <div className="product__meta">
          <span className="rating">★ {product.rating ?? '—'}</span>
          <span className="stock">
            {product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
          </span>
        </div>
        <div className="product__bottom">
          <div className="price">{product.price.toFixed(2)} €</div>
          <button
            className="btn btn--primary"
            onClick={() => add(product, 1)}
            disabled={product.stock <= 0}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  )
}
