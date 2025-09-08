export function parseQuery(search) {
    const sp = new URLSearchParams(search)
    const obj = {}
    for (const [k,v] of sp.entries()) {
      if (k === 'categoryId' || k === 'brandId' || k === 'categoryIds' || k === 'brandIds') {
        const key = k.includes('Ids') ? k : `${k}s`
        obj[key] = obj[key] || []
        obj[key].push(v)
      } else if (k === 'price_gte' || k === 'price_lte') {
        obj.price = obj.price || {}
        obj.price[k==='price_gte'?'min':'max'] = Number(v)
      } else if (k === '_page' || k === '_limit') {
        obj[k] = Number(v)
      } else if (k === 'view') {
        obj.view = v
      } else if (k === '_sort' || k === '_order' || k === 'q') {
        obj[k] = v
      }
    }
    return obj
  }
  
  export function stringifyQuery(obj) {
    const sp = new URLSearchParams()
    if (obj._page) sp.set('_page', obj._page)
    if (obj._limit) sp.set('_limit', obj._limit)
    if (obj._sort) sp.set('_sort', obj._sort)
    if (obj._order) sp.set('_order', obj._order)
    if (obj.q) sp.set('q', obj.q)
    if (obj.view) sp.set('view', obj.view)
    ;(obj.categoryId || obj.categoryIds || []).forEach(v => sp.append('categoryId', v))
    ;(obj.brandId || obj.brandIds || []).forEach(v => sp.append('brandId', v))
    if (obj.price_gte != null || obj.price?.min != null) sp.set('price_gte', obj.price_gte ?? obj.price?.min)
    if (obj.price_lte != null || obj.price?.max != null) sp.set('price_lte', obj.price_lte ?? obj.price?.max)
    return '?' + sp.toString()
  }