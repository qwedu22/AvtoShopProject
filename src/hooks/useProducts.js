import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../services/api.js'


export default function useProducts(initialQuery) {
const [query, setQuery] = useState(initialQuery)
const [data, setData] = useState({ items: [], total: 0 })
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)


const params = useMemo(() => query, [query])


useEffect(() => {
setLoading(true)
setError(null)
getProducts(params)
.then(({ items, total }) => setData({ items, total }))
.catch(setError)
.finally(() => setLoading(false))
}, [params])


return { ...data, loading, error, setQuery }
}