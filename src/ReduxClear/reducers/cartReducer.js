import { initialState } from '../initialState'
import {
  CART_ADD_PRODUCT,
  CART_CHANGE_PRODUCT_QUANTITY,
  CART_CLEAR,
  CART_REMOVE_PRODUCT,
  CART_SET_EXTENDED_FROM_SERVER,
} from '../types/cartTypes'

// eslint-disable-next-line default-param-last
export const cartReducer = (state = initialState.cart, action) => {
  let aux
  switch (action.type) {
    case CART_ADD_PRODUCT:
      aux = state.filter((item) => item.id === action.payload.id)
      if (aux.length) {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity,
            }
          }
          return item
        })
      }
      return [action.payload, ...state]
    case CART_REMOVE_PRODUCT:
      return state.filter((product) => product.id !== action.payload)
    case CART_CHANGE_PRODUCT_QUANTITY:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.newQuantity,
          }
        }
        return item
      })
    case CART_CLEAR:
      return []
    case CART_SET_EXTENDED_FROM_SERVER:
      return action.payload
    default: return state
  }
}
