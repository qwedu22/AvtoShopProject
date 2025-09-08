import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Pagination from '../components/Pagination.jsx'
import SortBar from '../components/SortBar.jsx'
import useProducts from '../hooks/useProducts.js'
import { parseQuery, stringifyQuery } from '../utils/query.js'

export default function CatalogPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const initial = useMemo(() => parseQuery(location.search), [location.search])

  const [filters, setFilters] = useState({
    categoryIds: new Set(initial.categoryIds || []),
    brandIds: new Set(initial.brandIds || []),
    price: { min: initial.price?.min, max: initial.price?.max },
    q: initial.q || ''
  })
  const [sort, setSort] = useState({ field: initial._sort || 'id', order: initial._order || 'desc' })
  const [page, setPage] = useState(initial._page || 1)
  const [limit, setLimit] = useState(initial._limit || 12)
  const [view, setView] = useState(initial.view || 'grid')

  const request = useMemo(() => ({
    _page: page, _limit: limit,
    _sort: sort.field, _order: sort.order,
    q: filters.q || undefined,
    ...(filters.categoryIds.size ? { categoryId: Array.from(filters.categoryIds) } : {}),
    ...(filters.brandIds.size ? { brandId: Array.from(filters.brandIds) } : {}),
    ...(filters.price.min != null ? { price_gte: filters.price.min } : {}),
    ...(filters.price.max != null ? { price_lte: filters.price.max } : {}),
  }), [filters, sort, page, limit])

  const { items, total, loading, error, setQuery } = useProducts(request)

  useEffect(() => {
    const search = stringifyQuery({ ...request, view })
    navigate({ pathname: '/catalog', search }, { replace: true })
    setQuery(request)
  }, [request, view])

  return (
    <div className="catalog">
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        onApply={() => setPage(1)}
      />
      <section className="catalog__content">
        <div className="catalog__top">
          <input
            className="search-inline"
            placeholder="Поиск по каталогу"
            value={filters.q}
            onChange={(e)=> setFilters(f => ({...f, q: e.target.value}))}
          />
          <SortBar sort={sort} setSort={setSort} view={view} setView={setView} total={total} />
        </div>

        {loading && <div className="state">Загрузка…</div>}
        {error && <div className="state state--error">Ошибка: {String(error)}</div>}

        {!loading && items.length === 0 && <div className="state">По вашему запросу ничего не найдено</div>}

        <div className={`grid ${view==='list' ? 'grid--list' : ''}`}>
          {items.map(p => <ProductCard key={p.id} product={p} view={view} />)}
        </div>

        <div className="catalog__bottom">
          <label>
            На странице:
            <select value={limit} onChange={e=> { setLimit(Number(e.target.value)); setPage(1) }}>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </label>
          <Pagination
            page={page}
            pages={Math.ceil(total / limit) || 1}
            onPage={setPage}
          />
        </div>
      </section>
    </div>
  )
}