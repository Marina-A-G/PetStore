/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cartClearAC, cartSetExtendedFromServerAC } from '../../ReduxClear/actionCreators/cartAC'
import cartStyles from './cart.module.scss'
import { CartItem } from './CartItem'
import { api } from '../../classes/APIclass'

export function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart)
  const token = useSelector((store) => store.token)
  const navigate = useNavigate()
  // let cartExtended = []
  // const [cartExtended, setCartExtended] = useState([])

  /* const cartLoadOnSuccess = (listFromServer) => {
    const aux = cart.map((item) => {
      const itemFromServer = listFromServer.find((itemFind) => itemFind._id === item.id)
      return {
        ...item,
        price: itemFromServer.price,
        discount: itemFromServer.discount,
        stock: itemFromServer.stock,
        name: itemFromServer.name,
        pictures: itemFromServer.pictures,
      }
    })
    console.log({ aux })
    dispatch(cartSetExtendedFromServerAC(aux))
  } */

  const cartLoadOnError = () => {
    alert('Ошибка')
  }
  // eslint-disable-next-line no-unused-vars
  const { data: cartData = [], isLoading } = useQuery({
    queryKey: ['cart', cart.map((product) => product.id)],
    queryFn: () => api.getProductsByIDs(cart.map((product) => product.id), token),
    // onSuccess: (response) => cartLoadOnSuccess(response),
  })

  const cartExtended = cart.map((item) => {
    const itemFromServer = cartData.find((itemFind) => itemFind._id === item.id)
    return {
      ...item,
      ...itemFromServer,
    }
  })

  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  const cartClearHandler = () => {
    dispatch(cartClearAC())
  }
  /*
  const cartShowHandler = () => {
    console.log({ cart })
  }

  const cartShowHandler2 = () => {
    console.log({ cartData })
  }
*/
  if (!cart.length) {
    return (
      <div>
        Так вы пока ничего не выбрали...
        <br />
        Посмотрите
        <Link to="/products/"> здесь </Link>
        , может, что понравится)
      </div>
    )
  }
  if (isLoading) return <p>Грузимся-грузимся</p>
  // if (!cartExtended.length) return <p>Думаем-думаем</p>

  return (
    <>
      <h2>Корзина</h2>

      <button type="button" onClick={cartClearHandler}>Очистить корзину</button>
      <div className={cartStyles.cartContainer}>
        <div className={cartStyles.cartProductsListContainer}>
          <h3>Товары</h3>
          {cartExtended.map((cartItem) => <CartItem key={cartItem.id} item={cartItem} />)}
        </div>
        <div className={cartStyles.cartTotalContainer}>
          <h3>Количество и стоимость</h3>
          <div>
            {`Количество наименований: ${cart.length}`}
            <br />
            {`Количество единиц товаров: ${cartExtended.reduce((sum, item) => sum + item.quantity, 0)}`}
            <br />
            {`Общая стоимость: ${cartExtended.reduce((sum, item) => sum + item.quantity * Math.round(item.price * (1 - item.discount / 100)), 0)}`}
            <br />
            <br />
            <u>Выбрано для заказа:</u>
            <br />
            {`Количество единиц товаров: ${cartExtended.reduce((sum, item) => sum + item.quantity * Number(item.isForOrder), 0)}`}
            <br />
            {`Общая стоимость: ${cartExtended.reduce((sum, item) => sum + item.quantity * Math.round(item.price * (1 - item.discount / 100)) * Number(item.isForOrder), 0)}`}
            <br />
          </div>
        </div>
      </div>
    </>

  )
}

/*
      <button type="button" onClick={cartShowHandler}>Показать корзину</button>
      <button type="button" onClick={cartShowHandler2}>Показать корзину с сервера</button>
      */
