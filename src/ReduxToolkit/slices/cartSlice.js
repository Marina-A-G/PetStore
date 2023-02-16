import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../initialState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState().cart,
  reducers: {
    // здесь state - это не весь state, а только срез cart
    cartAddProduct: {
      reducer(state, action) {
        const aux = state.filter((item) => item.id === action.payload.id)
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
      },
      prepare(id, quantity) {
        return {
          payload: {
            id,
            quantity,
            isForOrder: true,
          },
        }
      },

    },
    // редьюсеры могут быть не просто функциями, которые принимают значения, а могут быть объектами, у которых 2 ключа: reducer и prepare, который готовит payload action'а, прежде чем он попадет в редьюсер
    // названия reducer и prepare  зарезервированы, только такие могут быть. Prepare может принимать неограниченное количество параметров через запятую

    cartRemoveProduct(state, action) {
      return state.filter((product) => product.id !== action.payload)
    },

    cartChangeProductQuantity: {
      reducer(state, action) {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.newQuantity,
            }
          }
          return item
        })
      },
      prepare(id, newQuantity) {
        return {
          payload: {
            id,
            newQuantity,
          },
        }
      },
    },

    cartChangeProductStatusForOrder(state, action) {
      // здесь мутируется текущий массив, но благодаря библиотеке Redux воспринимает это нормально
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) {
        currentProduct.isForOrder = !currentProduct.isForOrder
      }
    },

    cartClear() {
      return []
    },

    cartSetExtendedFromServer(action) {
      return action.payload
    },

  },
})

export const {
  cartAddProduct,
  cartRemoveProduct,
  cartChangeProductQuantity,
  cartChangeProductStatusForOrder,
  cartClear,
  cartSetExtendedFromServer,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer

/*
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
      return [{ ...action.payload, isForOrder: true }, ...state]
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
    case CART_CHANGE_STATUS_FOR_ORDER:
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            isForOrder: !item.isForOrder,
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
*/
