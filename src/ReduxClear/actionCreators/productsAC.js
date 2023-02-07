import { PRODUCTS_SET } from '../types/productTypes'

export const productsSetAC = (products) => ({
  type: PRODUCTS_SET,
  payload: products,
})
