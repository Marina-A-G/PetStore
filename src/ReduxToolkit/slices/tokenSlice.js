import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../ReduxClear/initialState'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: getInitialState().token,
  reducers: {

  },
})
