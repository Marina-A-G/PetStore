/* eslint-disable no-irregular-whitespace */
import { useState } from 'react'
// import {
// group, TokenLSkey, URLbase, URLsignin, URLsignup, URLuserInfo,
// } from '../utils/constants'

export const useUser = () => {
  const [user, setUser] = useState({})
  console.log('useUser render')

  // GETTING USERDATA
  /*

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

  } */

  //  RETURN

  return {
    user,
    setUser,
  }
}

/*
getUserDataRequest,
editUserData,
editUserDataRequest,
*/

/*
ответы при успешной регистрации:
regUser, response:  {name: 'Иван Иванов', about: 'Писатель', avatar: 'https://react-learning.ru/image-compressed/default-image.jpg', isAdmin: false, _id: '63b1afd459b98b038f77a3f6', …}about: "Писатель"avatar: "https://react-learning.ru/image-compressed/default-image.jpg"email: "a@b.ru"group: "sm8"isAdmin: falsename: "Иван Иванов"__v: 0_id: "63b1afd459b98b038f77a3f6"[[Prototype]]: Object

useUser.js:72 user:  {name: 'Иван Иванов', about: 'Писатель', avatar: 'https://react-learning.ru/image-compressed/default-image.jpg', isAdmin: false, _id: '63b1afd459b98b038f77a3f6', …}about: "Писатель"avatar: "https://react-learning.ru/image-compressed/default-image.jpg"email: "a@b.ru"group: "sm8"isAdmin: falsename: "Иван Иванов"__v: 0_id: "63b1afd459b98b038f77a3f6"[[Prototype]]: Object
*/
