import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlice'
import { productsReducer } from './slices/productsSlice'
import { tokenReducer } from './slices/tokenSlice'
import { TokenLSkey } from '../utils/constants'
import { favouritesReducer } from './slices/favouritesSlice'
import { urlReducer } from './slices/urlSlice'
// thunk позволяет вынести асинхроную логику внутрь actionCreator'ов
// import {configureStore} from '@reduxjs/toolkit'
// import tokenSlice from '/.... без {} потому что дефолтный импорт, если бы в итоге оставили дефолтный импорт

/*
export const store = createStore(
  rootReducer,
  getInitialState(),
  composeWithDevTools(applyMiddleware(thunk)),
)
*/

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    token: tokenReducer,
    products: productsReducer,
    favourites: favouritesReducer,
    url: urlReducer,
  },
})

// функция принимает в себя одну сущность - объект, в объекте есть ключи, которые настраивают стор. У нее есть куча настроек
// можно указать уже существующий рутовский редьюсер, а можно сразу указать составляющие. Но не те, которые раньше были, а по-другому

store.subscribe(() => {
  const LSdata = {
    token: store.getState().token,
    cart: store.getState().cart,
    favourites: store.getState().favourites,
    url: store.getState().url,
  }
  // console.log({ LSdata })
  localStorage.setItem(TokenLSkey, JSON.stringify(LSdata))
})
