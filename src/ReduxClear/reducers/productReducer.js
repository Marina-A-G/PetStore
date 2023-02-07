import { initialState } from '../initialState'
import { PRODUCTS_SET } from '../types/productTypes'

// eslint-disable-next-line default-param-last
export const productsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case PRODUCTS_SET:
      return action.payload
    default: return state
  }
}
