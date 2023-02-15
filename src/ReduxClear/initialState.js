import { api } from '../classes/APIclass'

export const initialState = {
  cart: [],
  token: '',
  products: [],

}

export const getInitialState = () => {
  const tokenLS = api.checkTokenAvailabilityInLS()
  const cartLS = api.checkCartAvailabilityInLS()
  return { cart: cartLS, token: tokenLS, products: [] }
}
