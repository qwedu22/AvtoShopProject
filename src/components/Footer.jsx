export default function Footer() {
    return (
      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <div className="logo">AutoParts</div>
            <p>Запчасти для авто с доставкой по всей стране.</p>
          </div>
          <div>
            <h4>Навигация</h4>
            <ul>
              <li><a href="/">Главная</a></li>
              <li><a href="/catalog">Каталог</a></li>
              <li><a href="/account">Личный кабинет</a></li>
            </ul>
          </div>
          <div>
            <h4>Контакты</h4>
            <ul>
              <li>☎ +33 1 23 45 67 89</li>
              <li>✉ support@autoparts.local</li>
              <li>🕒 Пн-Пт 9:00–18:00</li>
            </ul>
          </div>
          <div>
            <h4>Подписка</h4>
            <form onSubmit={(e)=>e.preventDefault()} className="subscribe">
              <input type="email" placeholder="Ваш email" required />
              <button>Подписаться</button>
            </form>
            <div className="socials"> </div>
          </div>
        </div>
        <div className="container footer__copy">© {new Date().getFullYear()} AutoParts</div>
      </footer>
    )
  }