import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../initialState'

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: getInitialState().favourites,
  reducers: {
    favouritesAddProduct(state, action) {
      const aux = state.filter((item) => item === action.payload)
      if (!aux.length) {
        state.push(action.payload)
      }
    },

    favouritesRemoveProduct(state, action) {
      return state.filter((item) => item !== action.payload)
    },
  },
})

export const favouritesReducer = favouritesSlice.reducer

export const {
  favouritesAddProduct,
  favouritesRemoveProduct,
} = favouritesSlice.actions
