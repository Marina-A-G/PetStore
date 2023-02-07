import { TOKEN_ADD, TOKEN_DELETE } from '../types/tokenTypes'

export const tokenAddAC = (token) => ({
  type: TOKEN_ADD,
  payload: token,
})
export const tokenDeleteAC = () => ({
  type: TOKEN_DELETE,
})
