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
    this.URLproductsSearched = 'products/search?query=' // for products search. With GET method
    this.URLproductByID = 'products/' // :id - получение товра по id - GET
  }

  /// ///////////////////////////  USER  ///////////////////////////

  //    AUTHORIZATION request

  async authUserRequest({ email, password }) {
    const reqBody = {
      email,
      password,
    }
    const response = await fetch(`${this.URLbase}${this.URLsignin}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })
    if (response.status > 399) {
      const errMessage = await response.json()
      console.log({ errMessage })
      throw new Error(errMessage.message)
    }
    return response.json()
  }

  //    REGISTRATION request

  async regUserRequest({ email, password }) {
    const reqBody = {
      email,
      group: this.group,
      password,
    }
    const response = await fetch(`${this.URLbase}${this.URLsignup}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })
    if (response.status > 399) {
      const errMessage = await response.json()
      console.log({ errMessage })
      throw new Error(errMessage.message)
    }
    return response.json()
  }

  //    GETTING USERDATA request

  async getUserDataRequest(token) {
    // const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
    const response = await fetch(`${this.URLbase}${this.URLuserInfo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    if (response.status > 399) {
      const errMessage = await response.json()
      console.log({ errMessage })
      throw new Error(errMessage.message)
    }
    return response.json()
  }

  //    USER DATA EDIT request

  async editUserDataRequest(reqData, token) {
    // const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
    const response = await fetch(`${this.URLbase}${this.URLuserInfo}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqData),
    })
    if (response.status > 399) {
      const errMessage = await response.json()
      console.log({ errMessage })
      throw new Error(errMessage.message)
    }
    return response.json()
  }

  /// /////////////////////////  PRODUCTS  /////////////////////////

  //  GET ALL PRODUCTS request

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
    // возвращаемое из async-функции в любом случае будет промисом. Как бы мы ни хотели чего-то другого
    // и then потом понадобится в любом случае(((
  }

  //  GET SEARCHED PRODUCTS

  async getSearchedProductsRequest(searched, token) {
    console.log(`${this.URLbase}${this.URLproductsSearched}${searched}`)
    const response = await fetch(`${this.URLbase}${this.URLproductsSearched}${searched}`, {
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
  }

  //  GET SET OF PRODUCTS BY IDS

  async getProductsByIDs(ids, token) {
    // eslint-disable-next-line max-len
    return Promise.all(ids.map((id) => fetch(
      `${this.URLbase}${this.URLproductByID}${id}`,
      {
      // method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json())))
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
    return tokenObj.token
  }
}

export const api = new APIforPetStore()
