import { initialState } from '../initialState'
import { TOKEN_ADD, TOKEN_DELETE } from '../types/tokenTypes'

// eslint-disable-next-line default-param-last
export const tokenReducer = (state = initialState.token, action) => {
  switch (action.type) {
    case TOKEN_ADD:
      return action.payload
    case TOKEN_DELETE:
      return ''
    default: return state
  }
}
