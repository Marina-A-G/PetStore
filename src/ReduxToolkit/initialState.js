import { api } from '../classes/APIclass'

export const initialState = {
  cart: [],
  token: '',
  products: [],
  favourites: [],
  url: { q: '', sort: '', filter: '' },
}

export const getInitialState = () => {
  const tokenLS = api.checkTokenAvailabilityInLS()
  const cartLS = api.checkCartAvailabilityInLS()
  const favouritesLS = api.checkFavouritesAvailabilityInLS()
  const urlLS = api.checkUrlParamsAvailabilityInLS()
  return {
    cart: cartLS,
    token: tokenLS,
    products: [],
    favourites: favouritesLS,
    url: urlLS,
  }
}
