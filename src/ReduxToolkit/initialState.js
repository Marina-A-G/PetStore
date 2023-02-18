import { api } from '../classes/APIclass'

export const initialState = {
  cart: [],
  token: '',
  products: [],
  favourites: [],
}

export const getInitialState = () => {
  const tokenLS = api.checkTokenAvailabilityInLS()
  const cartLS = api.checkCartAvailabilityInLS()
  const favouritesLS = api.checkFavouritesAvailabilityInLS()
  return {
    cart: cartLS,
    token: tokenLS,
    products: [],
    favourites: favouritesLS,
  }
}
