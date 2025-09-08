import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Header() {
  const { items } = useCart()
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/catalog?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo">AutoParts</Link>
        <nav className="nav">
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/account">Личный кабинет</NavLink>
        </nav>
        <form className="search" onSubmit={onSearch}>
          <input
            type="search"
            placeholder="Поиск запчастей..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">Найти</button>
        </form>
        <div className="header__actions">
          <button className="btn btn--ghost" onClick={toggle} title="Сменить тему">
            {theme === 'light' ? '🌞' : '🌙'}
          </button>
          <Link to="/cart" className="cart">
            🛒<span className="badge">{items.reduce((s, i) => s + i.qty, 0)}</span>
          </Link>
          <Link to="/account" className="avatar" title="Аккаунт">👤</Link>
        </div>
      </div>
    </header>
  )
}