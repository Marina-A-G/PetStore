import { api } from '../classes/APIclass'
import { PRODUCTS_STATUSES } from './slices/productsConstants'

export const initialState = {
  cart: [],
  token: '',
  products: {
    products: [],
    status: PRODUCTS_STATUSES.idle,
    error: null,
  },
}

export const getInitialState = () => {
  const tokenLS = api.checkTokenAvailabilityInLS()
  const cartLS = api.checkCartAvailabilityInLS()
  const prods = {
    products: [],
    status: PRODUCTS_STATUSES.idle,
    error: null,
  }
  return { cart: cartLS, token: tokenLS, products: prods }
}
