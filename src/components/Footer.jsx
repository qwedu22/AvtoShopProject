export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Инфо */}
        <div className="footer__col">
          <h4>О компании</h4>
          <p>Магазин автозапчастей. Надежность и качество с 2025 года.</p>
        </div>

        {/* Навигация */}
        <div className="footer__col">
          <h4>Навигация</h4>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/catalog">Каталог</a></li>
            <li><a href="/account">Личный кабинет</a></li>
          </ul>
        </div>

        {/* Контакты */}
        <div className="footer__col">
          <h4>Контакты</h4>
          <p>📍 Москва, ул. Примерная, 1</p>
          <p>📞 +7 (999) 123-45-67</p>
          <p>✉ info@autoshop.ru</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 Autoshop. Все права защищены.</p>
      </div>
    </footer>
  )
}
