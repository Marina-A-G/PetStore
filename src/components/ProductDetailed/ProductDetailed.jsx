/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../classes/APIclass'
import {
  favouritesAddProduct,
  favouritesRemoveProduct,
} from '../../ReduxToolkit/slices/favouritesSlice'
import prodStyles from './productDetailed.module.scss'
import picFav from './heartFilled.png'
import picNotFav from './heartOutline.png'
import { cartAddProduct } from '../../ReduxToolkit/slices/cartSlice'
import { userDataGetQueryKey } from '../../utils/queryKeys'

export function ProductDetailed() {
  const { productID } = useParams()
  const token = useSelector((store) => store.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const favourites = useSelector((store) => store.favourites)
  let isFav
  if (favourites.indexOf(productID) === -1) {
    isFav = false
  } else isFav = true

  // let priceInitial
  // let priceFinal

  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  // -----  ЗАПРОСЫ К СЕРВЕРУ -----

  const { data: productData, isLoading: isLoadingProduct } = useQuery({
    queryKey: [productID],
    queryFn: () => api.getProductDataRequest(productID, token),
    onSuccess: (response) => {
      console.log('response product ', response)
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: [userDataGetQueryKey],
    queryFn: () => api.getUserDataRequest(token),
    onSuccess: (response) => {
      console.log('response USer ', response)
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })
  //  -------------------------------------------

  //  ----- ОБРАБОТЧИКИ КНОПОК  -----

  const productDataEditHandler = () => {
    navigate('edit/')
  }

  const addToCartHandler = (e) => {
    // eslint-disable-next-line max-len
    if ((e.target.parentNode.children.quantity.value) > 0) {
      const quantity = Number(e.target.parentNode.children.quantity.value) <= productData.stock
        ? Number(e.target.parentNode.children.quantity.value)
        : productData.stock
      dispatch(cartAddProduct(productData._id, quantity))
    }
  }

  const changeFavStatusHandler = () => {
    console.log('жмак!', productData._id, isFav)
    if (isFav) {
      dispatch(favouritesRemoveProduct(productData._id))
    } else {
      dispatch(favouritesAddProduct(productData._id))
    }
    isFav = !isFav
  }
  // --------------------------------------------

  //  ----- РАЗМЕТКА  -----

  if (isLoadingProduct || isLoadingUser) return <p>Уточняем данные...</p>

  return (
    <>
      <h1>Детальная инфа о товаре</h1>
      <div>
        {userData._id === productData.author._id
          && (
          <>
            <p>Это Ваш товар, и Вы можете поменять его инфу.</p>
            <button type="button" onClick={productDataEditHandler}>Поменять данные о товаре</button>
            <br />
            <br />
          </>
          )}
      </div>
      <div className={prodStyles.cardContainer}>
        <img src={productData.pictures} alt={productData.name} className={prodStyles.cardPicture} />
        {productData.discount > 0
      && <div className={prodStyles.discount}>{`${productData.discount}%`}</div>}
        <img
          src={isFav ? picFav : picNotFav}
          alt=""
          className={prodStyles.cardFav}
          onClick={changeFavStatusHandler}
        />
        <div className={prodStyles.cardName}>
          {`Название: ${productData.name}`}
          <br />
          {`Описание: ${productData.description}`}
          <br />
          {`Вес: ${productData.wight}`}
        </div>
        <div className={prodStyles.cardName}>
          {`Цена: ${Math.round(productData.price * (1 - productData.discount / 100))} р.`}
          {productData.discount > 0
      && <div>{`Цена без скидки: ${productData.price} р. (скидка ${productData.discount} %)`}</div>}
          <br />
          {`В наличии: ${productData.stock}`}
        </div>

        <div className={prodStyles.cardCartElementsContainer}>
          <input
            name="quantity"
            type="number"
            min="0"
            max={productData.stock}
            className={prodStyles.cardCartInput}
            placeholder="0"
          />
          <button
            type="button"
            className={prodStyles.cardCartButton}
            onClick={(e) => addToCartHandler(e)}
          >
            в корзину

          </button>
        </div>

      </div>
    </>
  )
}

/*
author
:
{name: 'Lorem Ipsum', about: 'fsd', avatar: 'https://dogcatdog.ru/wp-content/uploads/3/4/6/346129b78ddeba606f8aa1d616ad15cb.jpe', _id: '622bd81b06c7d323b8ae4614', email: 'maxim_91@inbox.ru', …}
available
:
true
created_at
:
"2022-03-12T10:37:16.303Z"
description
:
"Описание demo"
discount
:
0
isPublished
:
true
likes
:
(8) ['63c1c13559b98b038f77a5e7', '638a240959b98b038f779d6d', '63948ab259b98b038f779e44', '63e1282559b98b038f77b218', '63c6b5ab59b98b038f77a686', '63e3ef8359b98b038f77b3b4', '63d1bc5859b98b038f77abe4', '63ecfaf259b98b038f77b660']
name
:
"Калтык говяжий для собак"
pictures
:
"https://react-learning.ru/image-compressed/5.jpg"
price
:
290
reviews
:
[{…}]
stock
:
10
tags
:
[]
updated_at
:
"2023-02-19T17:56:22.708Z"
wight
:
"100 г"
__v
:
0
_id
:
"622c77dc77d63f6e70967d20"

*/
