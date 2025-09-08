import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="state">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/" className="btn btn--primary">На главную</Link>
    </div>
  )
}
