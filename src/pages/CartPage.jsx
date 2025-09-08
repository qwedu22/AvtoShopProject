import { useCart } from '../context/CartContext.jsx'
import { useUser } from '../context/UserContext.jsx'
import { useState } from 'react'

const COUPONS = {
  'SAVE10': { code: 'SAVE10', type: 'percent', value: 10, title: 'Скидка 10%' }
}

export default function CartPage() {
  const { items, setQty, remove, subtotal, discount, total, applyCoupon, coupon, checkout, clear } = useCart()
  const { user } = useUser()
  const [promo, setPromo] = useState('')
  const [placed, setPlaced] = useState(null)

  const apply = () => {
    const c = COUPONS[promo.toUpperCase()]
    if (c) applyCoupon(c)
    setPromo('')
  }

  const onOrder = async () => {
    const order = await checkout(user)
    setPlaced(order)
    clear()
  }

  return (
    <div className="cartpage">
      <h1>Корзина</h1>
      {items.length === 0 && <div className="state">Корзина пуста</div>}

      {items.length > 0 && (
        <div className="cartgrid">
          <div className="cartlist">
            {items.map(i => (
              <div className="cartitem" key={i.id}>
                <img src={i.images?.[0]} alt="" />
                <div className="cartitem__info">
                  <div className="title">{i.title}</div>
                  <div className="price">{i.price.toFixed(2)} €</div>
                </div>
                <input type="number" min={1} value={i.qty} onChange={e=> setQty(i.id, Number(e.target.value))} />
                <div className="line">{(i.qty * i.price).toFixed(2)} €</div>
                <button className="btn btn--ghost" onClick={()=> remove(i.id)}>✕</button>
              </div>
            ))}
          </div>

          <aside className="summary">
            <h3>Итого</h3>
            <div className="row"><span>Подытог</span><span>{subtotal.toFixed(2)} €</span></div>
            <div className="row"><span>Скидка</span><span>-{discount.toFixed(2)} €</span></div>
            <div className="row total"><span>К оплате</span><span>{total.toFixed(2)} €</span></div>
            <div className="promo">
              <input placeholder="Промокод" value={promo} onChange={e=> setPromo(e.target.value)} />
              <button onClick={apply}>Применить</button>
              {coupon && <div className="muted">Применено: {coupon.title}</div>}
            </div>
            <button className="btn btn--primary w-100" onClick={onOrder} disabled={items.length===0}>Оформить заказ</button>
          </aside>
        </div>
      )}

      {placed && (
        <div className="notice">
          Заказ №{placed.id} создан! Мы отправили подтверждение на email.
        </div>
      )}
    </div>
  )
}