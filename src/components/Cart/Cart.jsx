/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cartClearAC } from '../../ReduxClear/actionCreators/cartAC'
import cartStyles from './cart.module.scss'
import { CartItem } from './CartItem'
import { api } from '../../classes/APIclass'

export function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.cart)
  const token = useSelector((store) => store.token)
  const navigate = useNavigate()

  const cartLoadOnSuccess = (listFromServer) => {
    // дополнить список корзины данными по товарам: name, price, stock, discount
    console.log(listFromServer)
  }

  const cartLoadOnError = () => {
    alert('Ошибка')
  }
  // eslint-disable-next-line no-unused-vars
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => api.getProductsByIDs(cart.map((product) => product.id), token),
    onSuccess: (response) => cartLoadOnSuccess(response),
  })

  const totalSum = 0

  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  const cartClearHandler = () => {
    dispatch(cartClearAC())
  }

  const cartShowHandler = () => {
    console.log({ cart })
  }

  const cartShowHandler2 = () => {
    console.log({ cartItems })
  }

  if (isLoading) return <p>Грузимся-грузимся</p>
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

  return (
    <>
      <h2>Корзина</h2>
      <button type="button" onClick={cartShowHandler}>Показать корзину</button>
      <button type="button" onClick={cartShowHandler2}>Показать расширенную корзину</button>
      <button type="button" onClick={cartClearHandler}>Очистить корзину</button>
      <div className={cartStyles.cartContainer}>
        <div className={cartStyles.cartProductsListContainer}>
          <h3>Товары</h3>
          {}
          <CartItem />
          <CartItem />
        </div>
        <div className={cartStyles.cartTotalContainer}>
          <h3>Количество и стоимость</h3>
          <div>
            {`Количество наименований: ${cart.length}`}
            <br />
            {`Количество единиц товаров: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`}
            <br />
            {`Общая стоимость: ${totalSum}`}
            <br />
          </div>
        </div>
      </div>
    </>

  )
}
