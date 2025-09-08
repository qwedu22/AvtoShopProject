import { useEffect, useState } from 'react'
import { getBrands, getCategories } from '../services/api.js'


export default function Sidebar({ filters, setFilters, onApply }) {
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])


useEffect(() => {
    getCategories().then(setCategories)
    getBrands().then(setBrands)
}, [])


const toggleFromSet = (set, val) => set.has(val) ? (set.delete(val), new Set(set)) : new Set(set.add(val))

return (
    <aside className="sidebar">
        <div className="sidebar__section">
            <h4>Категории</h4>
            <ul className="checklist">
                {categories.map(c => (
                <li key={c.id}>
                    <label>
                        <input
                        type="checkbox"
                        checked={filters.categoryIds.has(String(c.id))}
                        onChange={() => setFilters(f => ({...f, categoryIds: toggleFromSet(new Set(f.categoryIds), String(c.id))}))}
                        /> {c.name}
                    </label>
                </li>
                ))}
            </ul>
        </div>
        
        
        <div className="sidebar__section">
        <h4>Бренды</h4>
        <ul className="checklist">
            {brands.map(b => (
            <li key={b.id}>
                <label>
                    <input
                    type="checkbox"
                    checked={filters.brandIds.has(String(b.id))}
                    onChange={() => setFilters(f => ({...f, brandIds: toggleFromSet(new Set(f.brandIds), String(b.id))}))}
                    /> {b.name}
                </label>
            </li>
            ))}
        </ul>
        </div>
        
        
        <div className="sidebar__section">
            <h4>Цена</h4>
            <div className="range">
                <input
                    type="number"
                    placeholder="От"
                    min={0}
                    value={filters.price.min ?? ''}
                    onChange={(e)=> setFilters(f => ({...f, price: { ...f.price, min: e.target.value ? Number(e.target.value) : undefined }}))}
                />
                <input
                    type="number"
                    placeholder="До"
                    min={0}
                    value={filters.price.max ?? ''}
                    onChange={(e)=> setFilters(f => ({...f, price: { ...f.price, max: e.target.value ? Number(e.target.value) : undefined }}))}
                />
            </div>
        </div>
        
        
        <button className="btn btn--primary w-100" onClick={onApply}>Применить фильтры</button>
    </aside>
    )
    }