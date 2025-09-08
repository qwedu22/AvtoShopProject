import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, getProducts } from '../services/api.js'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  useEffect(() => {
    getProductById(id).then(setProduct)
  }, [id])

  useEffect(() => {
    if (product?.categoryId) {
      getProducts({ categoryId: product.categoryId, _limit: 4, id_ne: product.id })
        .then(({items}) => setRelated(items))
    }
  }, [product])

  if (!product) return <div className="state">Загрузка…</div>

  return (
    <div className="productpage">
      <div className="productpage__top">
        <div className="gallery">
          <img src={product.images?.[0]} alt={product.title} />
          <div className="thumbs">
            {product.images?.slice(1).map((src, i) => (
              <img key={i} src={src} alt="" />
            ))}
          </div>
        </div>
        <div className="details">
          <h1>{product.title}</h1>
          <div className="sku">Артикул: {product.sku || '—'}</div>
          <div className="rating">★ {product.rating} · Отзывов: {product.reviews?.length || 0}</div>
          <div className="price price--xl">{product.price.toFixed(2)} €</div>
          <div className="qty">
            <input type="number" min={1} value={qty} onChange={(e)=> setQty(Math.max(1, Number(e.target.value)))} />
            <button className="btn btn--primary" onClick={()=> add(product, qty)}>Добавить в корзину</button>
          </div>
          <div className="specs">
            <h3>Характеристики</h3>
            <ul>
              {Object.entries(product.specs || {}).map(([k,v]) => <li key={k}><strong>{k}:</strong> {String(v)}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="tabs">
        <input type="radio" id="tab1" name="tabs" defaultChecked />
        <label htmlFor="tab1">Описание</label>
        <input type="radio" id="tab2" name="tabs" />
        <label htmlFor="tab2">Отзывы ({product.reviews?.length || 0})</label>
        <div className="tabcontent" id="content1">
          <p>{product.description}</p>
        </div>
        <div className="tabcontent" id="content2">
          {(product.reviews?.length ? product.reviews : []).map((r, i) => (
            <div className="review" key={i}>
              <div className="review__head">{r.author} · ★ {r.rating}</div>
              <div className="review__body">{r.text}</div>
            </div>
          ))}
          {(!product.reviews || product.reviews.length===0) && <div className="muted">Отзывов пока нет.</div>}
        </div>
      </div>

      <section>
        <div className="section__head">
          <h2>Похожие товары</h2>
          <Link to="/catalog">Перейти в каталог →</Link>
        </div>
        <div className="grid">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}