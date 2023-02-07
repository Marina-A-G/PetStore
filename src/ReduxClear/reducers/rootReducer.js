import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import { productsReducer } from './productReducer'
import { tokenReducer } from './tokenReducer'

export const rootReducer = combineReducers({
  cart: cartReducer,
  token: tokenReducer,
  products: productsReducer,
})
