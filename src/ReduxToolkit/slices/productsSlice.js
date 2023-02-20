/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { URLbase, URLproductsAll } from '../../utils/urls'
import { getInitialState } from '../initialState'

/*
export const getAllProductsFromServer = createAsyncThunk(
  'products/getAllProducts',
  // это название нужно только для инструмента разработчика, больше нигде руками его использовать не будем
  async (token) => {
    const response = await fetch(`${URLbase}${URLproductsAll}`, {
      // method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status > 399) {
      const errMessage = await response.json()
      console.log({ errMessage })
      throw new Error(errMessage.message)
    }
    return response.json()
  },
  // limit = - сколько максимум единиц хотим подгрузить
) */

//---------------------------------------------------

const productsSlice = createSlice({
  name: 'products',
  initialState: getInitialState().products,
  reducers: {
    productsSet(state, action) {
      return action.payload
    },

    productsSortPriceUp(state) {
      state.sort((prod1, prod2) => (Math.round(prod1.price * (1 - prod1.discount / 100))
      - Math.round(prod2.price * (1 - prod2.discount / 100))))
    },

    productsSortPriceDown(state) {
      state.sort((prod1, prod2) => (Math.round(prod2.price * (1 - prod2.discount / 100))
      - Math.round(prod1.price * (1 - prod1.discount / 100))))
    },

    productsSortOnlyDiscount(state) {
      return state.filter((product) => product.discount > 0)
    },
  },
  /*
  extraReducers(builder) {
    // builder - так принято называть. Можно и по-другому, но принято же
    builder
      .addCase(getAllProductsFromServer.pending, (state, action) => {
        state.status = PRODUCTS_STATUSES.loading
        state.error = null
      })
      .addCase(getAllProductsFromServer.fulfilled, (state, action) => {
        state.status = PRODUCTS_STATUSES.succeeded
        state.error = null
        console.log(action.payload)
        // if (!state.products.length) если будут задваиваться
        state.products.push(...action.payload)
        // здесь в action.payload будет записано то, что возвращается через return в getProducts...
        // promise выполнится и дождется где-то там под капотом
      })
      .addCase(getAllProductsFromServer.rejected, (state, action) => {
        state.status = PRODUCTS_STATUSES.failed
        console.log(action)
        state.error = action.error.message
      })
  }, */
})
// когда мы создали action creator getProducts... через createAsyncThunk, у него появились дополнительные поля, которые служат связью между action creator'ом b slice'ом.
// fulfilled - будет говорить о том, что запрос выполнен успешно
// pending - запрос начал выполняться и находится в режиме ожидания
// rejected - запрос выполнился неуспешно, произошла какая-то ошибка
// и мы должны обрабатывать 3 кейса: стартовал, успешно, неуспешно

export const getAllProductsSelector = ((store) => store.products)
// здесь массив продуктов
// export const getProductsSliceSelector = ((store) => store.products)
// здесь весь срез продуктов
export const {
  productsSet,
  productsSortPriceUp,
  productsSortPriceDown,
  productsSortOnlyDiscount,
} = productsSlice.actions

export const productsReducer = productsSlice.reducer

/*
 async getAllProductsRequest(token) {
    const response = await fetch(`${this.URLbase}${this.URLproductsAll}`, {
      // method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status > 399) {
      const errMessage = await response.json()
      console.log({ errMessage })
      throw new Error(errMessage.message)
    }
    return response.json()

  } */
