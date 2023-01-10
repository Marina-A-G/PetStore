/* eslint-disable class-methods-use-this */
// import {
// group, TokenLSkey, URLbase, URLsignin, URLsignup, URLuserInfo,
// } from '../utils/constants'

import { TokenLSkey } from '../utils/constants'

class APIforPetStore {
  constructor() {
    console.log('Я родился! (c)экземпляр класса APIforPetStore')
    this.group = 'sm8'
    this.URLbase = 'https://api.react-learning.ru/'
    this.URLsignup = 'signup/'
    this.URLsignin = 'signin/'
    this.URLproductsAll = 'products/'
    this.URLuserInfo = `v2/${this.group}/users/me/` // with GET method
    this.URLuserEdit = `v2/${this.group}/users/me` // with PATCH method
  }

  /// ///////////////////////////  USER  ///////////////////////////

  //    AUTHORIZATION request

  async authUserRequest(email, password) {
    const reqBody = {
      email,
      password,
    }
    try {
      const response = await fetch(`${this.URLbase}${this.URLsignin}`, {
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

  //    REGISTRATION request

  async regUserRequest(email, password) {
    const reqBody = {
      email,
      group: this.group,
      password,
    }
    try {
      const response = await fetch(`${this.URLbase}${this.URLsignup}`, {
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

  //    GETTING USERDATA request

  async getUserDataRequest(token) {
    try {
      // const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
      const response = await fetch(`${this.URLbase}${this.URLuserInfo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в getUserDataRequest')
      throw new Error(error)
    }
  }

  //    USER DATA EDIT request

  async editUserDataRequest(name, about) {
    const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
    const reqData = { name, about }
    try {
      const response = await fetch(`${this.URLbase}${this.URLuserInfo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqData),
      })
      return response.json()
    } catch (error) {
      console.log('ошибка в editUserDataRequest')
      throw new Error(error)
    }
  }

  /// /////////////////////////  PRODUCTS  /////////////////////////

  //  GET ALL PRODUCTS request

  async getAllProductsRequest() {
    const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
    try {
      const response = await fetch(`${this.URLbase}${this.URLproductsAll}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.json()
      // возвращаемое из async-функции в любом случае будет промисом. Как бы мы ни хотели чего-то другого
      // и then потом понадобится в любом случае(((
    } catch (error) {
      console.log('ошибка в getAllProductsRequest')
      throw new Error(error)
    }
  }

  /// //////////// CHECKS  ////////////////////////
  // это на случай слишком креативного пользователя:
  // 1 - если он вышел, а потом пошел сразу на страничку продуктов или данных
  // 2 - если стер из LocalStorage свой токен
  // к сожалению, не включает проверку, что пользователь своими шаловливыми ручками просто поменял сам токен

  checkTokenAvailabilityInLS() {
    const tokenObjFromLS = localStorage.getItem(TokenLSkey)
    if (!tokenObjFromLS) return '' // проверка на наличие записи в LS
    const tokenObj = JSON.parse(tokenObjFromLS)
    if (!tokenObj.token) return '' // проверка на наличие поля token в записи в LS
    console.log(`token=${tokenObj.token}`)
    return tokenObj.token
  }
}

export const api = new APIforPetStore()
