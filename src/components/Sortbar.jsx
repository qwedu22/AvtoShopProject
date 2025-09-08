export default function SortBar({ sort, setSort, view, setView, total }) {
    return (
      <div className="sortbar">
        <div>{total} товаров</div>
        <div className="sortbar__controls">
          <label>
            Сортировка:
            <select value={`${sort.field}:${sort.order}`} onChange={(e)=>{
              const [field, order] = e.target.value.split(':')
              setSort({ field, order })
            }}>
              <option value="price:asc">Цена ↑</option>
              <option value="price:desc">Цена ↓</option>
              <option value="rating:desc">Популярность</option>
              <option value="id:desc">Новизна</option>
            </select>
          </label>
          <div className="viewtoggle">
            <button className={view==='grid'?'active':''} onClick={()=> setView('grid')} title="Сетка">▦</button>
            <button className={view==='list'?'active':''} onClick={()=> setView('list')} title="Список">☰</button>
          </div>
        </div>
      </div>
    )
  }