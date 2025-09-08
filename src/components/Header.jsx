import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Header() {
  const { items } = useCart()

  return (
    <header className="header">
      <div className="header__container">
        {/* Логотип */}
        <Link to="/" className="header__logo">
          <img src="/images/logo/logo.png" alt="Логотип" />
        </Link>

        {/* Навигация */}
        <nav className="header__nav">
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/account">Личный кабинет</Link>
        </nav>

        {/* Корзина */}
        <div className="header__actions">
          <Link to="/cart" className="header__cart">
            🛒 <span>{items.length}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
