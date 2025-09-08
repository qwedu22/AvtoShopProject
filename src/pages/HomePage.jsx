import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProducts, getCategories } from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function HomePage() {
  const [popular, setPopular] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getProducts({ _limit: 8, _sort: 'rating', _order: 'desc' }).then(({items}) => setPopular(items))
    getCategories().then(setCategories)
  }, [])

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <h1>Автозапчасти с быстрой доставкой</h1>
          <p>Оригиналы и аналоги. Гарантия качества. Подберите нужную деталь прямо сейчас.</p>
          <Link to="/catalog" className="btn btn--primary">Перейти в каталог</Link>
        </div>
        <div className="hero__slider">
          <div className="banner">🔥 Скидки до 20% на тормозные диски</div>
          <div className="banner">🧊 Антифризы – 2 по цене 1</div>
          <div className="banner">🔧 Масляные фильтры – суперцены</div>
        </div>
      </section>

      <section className="features">
        <div className="feature">🚚 Доставка 1–3 дня</div>
        <div className="feature">✅ Проверенные поставщики</div>
        <div className="feature">💳 Оплата любым способом</div>
        <div className="feature">🛡 Гарантия и возврат</div>
      </section>

      <section>
        <div className="section__head">
          <h2>Хиты продаж</h2>
        </div>
        <div className="grid">
          {popular.map(p => (<ProductCard key={p.id} product={p} />))}
        </div>
      </section>
    </div>
  )
}