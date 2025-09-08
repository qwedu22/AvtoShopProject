const API = 'http://localhost:3001'

function toQuery(params) {
  const sp = new URLSearchParams()
  Object.entries(params || {}).forEach(([k,v]) => {
    if (v == null || v === '' || (Array.isArray(v) && v.length===0)) return
    if (Array.isArray(v)) v.forEach(val => sp.append(k, val))
    else sp.set(k, v)
  })
  return sp.toString()
}

export async function getProducts(params) {
  const query = toQuery(params)
  const res = await fetch(`${API}/products?${query}`)
  const items = await res.json()
  const total = Number(res.headers.get('X-Total-Count')) || items.length
  return { items, total }
}
export async function getProductById(id) {
  const res = await fetch(`${API}/products/${id}`)
  if (!res.ok) throw new Error('Не найдено')
  return res.json()
}
export async function getCategories(){
  const res = await fetch(`${API}/categories`)
  return res.json()
}
export async function getBrands(){
  const res = await fetch(`${API}/brands`)
  return res.json()
}
export async function createOrder(order){
  const res = await fetch(`${API}/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(order) })
  return res.json()
}
