import {
  CART_ADD_PRODUCT,
  CART_CHANGE_PRODUCT_QUANTITY,
  CART_CHANGE_STATUS_FOR_ORDER,
  CART_CLEAR, CART_REMOVE_PRODUCT,
  CART_SET_EXTENDED_FROM_SERVER,
} from '../types/cartTypes'

export const cartAddProductAC = (id, quantity) => ({
  type: CART_ADD_PRODUCT,
  payload: {
    id,
    quantity: +quantity,
  },
})

export const cartRemoveProductAC = (id) => ({
  type: CART_REMOVE_PRODUCT,
  payload: id,
})

export const cartChangeProductQuantityAC = (id, newQuantity) => ({
  type: CART_CHANGE_PRODUCT_QUANTITY,
  payload: {
    id,
    newQuantity,
  },
})

export const cartClearAC = () => ({
  type: CART_CLEAR,
})

export const cartSetExtendedFromServerAC = (cartExtended) => ({
  type: CART_SET_EXTENDED_FROM_SERVER,
  payload: cartExtended,
})

export const cartChangeStatusForOrderAC = (id) => ({
  type: CART_CHANGE_STATUS_FOR_ORDER,
  payload: id,
})
