import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers/rootReducer'
import { getInitialState } from './initialState'
import { TokenLSkey } from '../utils/constants'
// thunk позволяет вынести асинхроную логику внутрь actionCreator'ов

export const store = createStore(
  rootReducer,
  getInitialState(),
  composeWithDevTools(applyMiddleware(thunk)),
)

store.subscribe(() => {
  const LSdata = {
    token: store.getState().token,
  }
  // console.log({ LSdata })
  localStorage.setItem(TokenLSkey, JSON.stringify(LSdata))
})
