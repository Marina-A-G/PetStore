import { useEffect, useState } from 'react'
// import cardStyles from '../components/Products/products.module.scss'
import { TokenLSkey, URLbase, URLproductsAll } from '../utils/constants'

export const useProducts = () => {
  console.log('useProducts render')
  const [products, setProducts] = useState([])
  // принимает значение по умолчанию для состояния
  // возвращает 1 сущность - массив с 2 элементами: 1 - наша сущность, 2 - функция, с помощью которой можем менять состояние. И менять сущность только с помощью нее.

  async function getAllProductsRequest() {
    const { token } = JSON.parse(localStorage.getItem(TokenLSkey))
    // console.log('token: ', token)
    try {
      const response = await fetch(`${URLbase}${URLproductsAll}`, {
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

  useEffect(() => {
    getAllProductsRequest().then((data) => {
      console.log('request for Products from useProductsHook')
      // console.log(data.products[0])
      setProducts(data.products)
    })
  }, [])

  return {
    products,
    setProducts,
    getAllProductsRequest,
  }
}
