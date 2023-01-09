/* eslint-disable no-irregular-whitespace */
// import { useEffect, useState } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  group, TokenLSkey, URLbase, URLsignin, URLsignup, URLuserInfo,
} from '../utils/constants'

export const useUser = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  console.log('useUser render')

  // AUTHORIZATION

  async function authUserRequest(email, password) {
    // const URLfinal = `${URLbase}${URLsignin}`
    const reqBody = {
      email,
      password,
    }
    try {
      const response = await fetch(`${URLbase}${URLsignin}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в authUserRequest')
      throw new Error(error)
    }
  }
  /*
  function authUser(email, password) {
    authUserRequest(email, password).then((response) => {
      if (typeof response.err !== 'undefined') {
        console.log('status code in authUser: ', response.err.statusCode)
        console.log('response in authUser: ')
        console.log(response)
        const forReturn = {
          result: 0,
          errCode: response.err.statusCode,
          errMessage: response.message,
        }
        console.log('forReturn: ', forReturn)
        return forReturn
      }
      const LSdata = {
        email,
        token: response.token,
      }
      localStorage.setItem(TokenLSkey, JSON.stringify(LSdata))
      console.log('authUser, response: ', response)
      return response.token
    }).catch(alert)
  } */

  // REGISTRATION

  async function regUserRequest(email, password) {
    // const URLfinal = `${URLbase}${URLsignup}`
    const reqBody = {
      email,
      group,
      password,
    }
    // console.log('regUserRequest: ', reqBody)
    // console.log(email, password)
    try {
      const response = await fetch(`${URLbase}${URLsignup}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в regUserRequest')
      throw new Error(error)
    }
  }

  const regUser = (email, password) => {
    regUserRequest(email, password).then((response) => {
      if (typeof response.err !== 'undefined' || typeof response.error !== 'undefined') {
        console.log('response in regUser: ', response)
        // eslint-disable-next-line max-len, no-alert
        alert(`Ошибка:  ${response.message}. Попробуйте еще раз.`)
      } else {
        setUser(response)
        console.log('user from regUser: ')
        console.log(user)
        navigate('/')
        // по-хорошему надо здесь сразу прописать авторизацию и получение токена, чтобы
      }
    }).catch(alert)
  }

  // GETTING USERDATA

  async function getUserDataRequest() {
    try {
      const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
      const response = await fetch(`${URLbase}${URLuserInfo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в regUserRequest')
      throw new Error(error)
    }
  }

  useEffect(() => () => {
    console.log('размонтирование useUser')
  })

  useEffect(() => {
    if (localStorage.getItem(TokenLSkey)) {
      getUserDataRequest().then((response) => {
        setUser(response)
      })
    }
  }, [])

  //  RETURN

  return {
    user,
    setUser,
    authUserRequest,
    regUserRequest,
    regUser,
    getUserDataRequest,
  }
}

/*
ответы при успешной регистрации:
regUser, response:  {name: 'Иван Иванов', about: 'Писатель', avatar: 'https://react-learning.ru/image-compressed/default-image.jpg', isAdmin: false, _id: '63b1afd459b98b038f77a3f6', …}about: "Писатель"avatar: "https://react-learning.ru/image-compressed/default-image.jpg"email: "a@b.ru"group: "sm8"isAdmin: falsename: "Иван Иванов"__v: 0_id: "63b1afd459b98b038f77a3f6"[[Prototype]]: Object
useUser.js:70 regUser, response.message:  undefined
useUser.js:72 user:  {name: 'Иван Иванов', about: 'Писатель', avatar: 'https://react-learning.ru/image-compressed/default-image.jpg', isAdmin: false, _id: '63b1afd459b98b038f77a3f6', …}about: "Писатель"avatar: "https://react-learning.ru/image-compressed/default-image.jpg"email: "a@b.ru"group: "sm8"isAdmin: falsename: "Иван Иванов"__v: 0_id: "63b1afd459b98b038f77a3f6"[[Prototype]]: Object
*/
