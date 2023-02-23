/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../initialState'

const urlSlice = createSlice({
  name: 'url',
  initialState: getInitialState().url,
  reducers: {
    sortAdd(state, action) {
      state.sort = action.payload
    },
    sortRemove(state) {
      state.sort = ''
    },
    filterAdd(state, action) {
      state.filter = action.payload
    },
    filterRemove(state) {
      state.filter = ''
    },
    searchAdd(state, action) {
      state.q = action.payload
    },
    searchRemove(state) {
      state.q = ''
    },
  },
})

export const {
  sortAdd, sortRemove, filterAdd, filterRemove, searchAdd, searchRemove,
} = urlSlice.actions

export const urlReducer = urlSlice.reducer
