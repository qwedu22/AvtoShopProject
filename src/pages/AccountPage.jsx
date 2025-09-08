import { useUser } from '../context/UserContext.jsx'
import { useState } from 'react'

export default function AccountPage() {
  const { user, login, logout, update } = useUser()
  const [form, setForm] = useState({ email: '', password: '' })

  if (!user) {
    return (
      <div className="account">
        <h1>Вход</h1>
        <form className="form" onSubmit={(e)=> { e.preventDefault(); login(form.email, form.password) }}>
          <label>Email<input type="email" required value={form.email} onChange={e=> setForm(f=>({...f,email:e.target.value}))} /></label>
          <label>Пароль<input type="password" required value={form.password} onChange={e=> setForm(f=>({...f,password:e.target.value}))} /></label>
          <button className="btn btn--primary">Войти</button>
        </form>
      </div>
    )
  }

  return (
    <div className="account">
      <h1>Личный кабинет</h1>
      <div className="card">
        <div className="row"><strong>Имя:</strong> {user.name}</div>
        <div className="row"><strong>Email:</strong> {user.email}</div>
        <button className="btn" onClick={logout}>Выйти</button>
      </div>

      <div className="card">
        <h3>Редактирование профиля</h3>
        <form className="form" onSubmit={(e)=> { e.preventDefault(); update({ name: e.target.name.value }) }}>
          <label>Имя<input name="name" defaultValue={user.name} /></label>
          <label>Смена пароля<input name="password" type="password" placeholder="Новый пароль" /></label>
          <button className="btn btn--primary">Сохранить</button>
        </form>
      </div>

      <div className="card">
        <h3>Избранное</h3>
        <div className="muted">Список избранных скоро появится.</div>
      </div>

      <div className="card">
        <h3>История заказов</h3>
        <div className="muted">Для демо заказы создаются при оформлении в корзине (JSON Server).</div>
      </div>
    </div>
  )
}