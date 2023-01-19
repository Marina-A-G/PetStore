/* eslint-disable no-irregular-whitespace */
import { useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState({})
  console.log('useUser render')

  return {
    user,
    setUser,
  }
}

/*
ответы при успешной регистрации:
regUser, response:  {name: 'Иван Иванов', about: 'Писатель', avatar: 'https://react-learning.ru/image-compressed/default-image.jpg', isAdmin: false, _id: '63b1afd459b98b038f77a3f6', …}about: "Писатель"avatar: "https://react-learning.ru/image-compressed/default-image.jpg"email: "a@b.ru"group: "sm8"isAdmin: falsename: "Иван Иванов"__v: 0_id: "63b1afd459b98b038f77a3f6"[[Prototype]]: Object

useUser.js:72 user:  {name: 'Иван Иванов', about: 'Писатель', avatar: 'https://react-learning.ru/image-compressed/default-image.jpg', isAdmin: false, _id: '63b1afd459b98b038f77a3f6', …}about: "Писатель"avatar: "https://react-learning.ru/image-compressed/default-image.jpg"email: "a@b.ru"group: "sm8"isAdmin: falsename: "Иван Иванов"__v: 0_id: "63b1afd459b98b038f77a3f6"[[Prototype]]: Object
*/
