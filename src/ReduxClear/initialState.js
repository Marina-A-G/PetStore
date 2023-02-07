import { api } from '../classes/APIclass'

export const initialState = {
  cart: [],
  token: '',
  products: [],

}

export const getInitialState = () => {
  const tokenLS = api.checkTokenAvailabilityInLS()
  return { cart: [], token: tokenLS, products: [] }
}
