import { createContext, useContext, useEffect, useReducer } from 'react'
import { createOrder } from '../services/api.js'

const CartContext = createContext(null)

const initialState = {
  items: [], // {id,title,price,images,qty}
  coupon: null
}

function reducer(state, action) {
  switch(action.type) {
    case 'ADD': {
      const { product, qty } = action
      const exist = state.items.find(i => i.id === product.id)
      const items = exist
        ? state.items.map(i => i.id===product.id ? { ...i, qty: Math.min(i.qty + qty, product.stock || 99) } : i)
        : [...state.items, { id: product.id, title: product.title, price: product.price, images: product.images, qty }]
      return { ...state, items }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'QTY':
      return { ...state, items: state.items.map(i => i.id===action.id ? { ...i, qty: Math.max(1, action.qty) } : i) }
    case 'CLEAR':
      return { ...state, items: [], coupon: null }
    case 'COUPON':
      return { ...state, coupon: action.coupon }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : init
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = state.coupon?.type === 'percent' ? subtotal * (state.coupon.value/100) : 0
  const total = Math.max(0, subtotal - discount)

  const value = {
    items: state.items,
    coupon: state.coupon,
    subtotal, discount, total,
    add: (product, qty=1) => dispatch({ type: 'ADD', product, qty }),
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    setQty: (id, qty) => dispatch({ type: 'QTY', id, qty }),
    clear: () => dispatch({ type: 'CLEAR' }),
    applyCoupon: (coupon) => dispatch({ type: 'COUPON', coupon }),
    checkout: async (user) => {
      const order = {
        userId: user?.id || null,
        items: state.items,
        coupon: state.coupon,
        subtotal, discount, total,
        createdAt: new Date().toISOString(),
        status: 'created'
      }
      const created = await createOrder(order)
      return created
    }
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)