/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../classes/APIclass'
import { ProductCards } from '../productCards/ProductCards'
import prodStyles from './products.module.scss'
import {
  productsSet, productsSortOnlyDiscount, productsSortPriceDown, productsSortPriceUp,
} from '../../ReduxToolkit/slices/productsSlice'
import {
  sortAdd, sortRemove, filterAdd, filterRemove, searchRemove,
} from '../../ReduxToolkit/slices/urlSlice'
import { allProductsGetQueryKey } from '../../utils/queryKeys'
import { FILTER, SORT } from '../../utils/constants'

export function Products() {
  // onsole.log('Products render')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const searchBarInput = document.getElementById('searchBarInput')
  let urlTemp = {}

  const token = useSelector((store) => store.token)
  const products = useSelector((store) => store.products)
  const urlParams = useSelector((store) => store.url)

  const sortPriceUpHandler = () => {
    if (!urlParams.q) {
      dispatch(productsSortPriceUp())
      dispatch(sortAdd(SORT.priceUp))
      setSearchParams({ sort: SORT.priceUp, filter: urlParams.filter })
    }
  }

  const sortPriceDownHandler = () => {
    if (!urlParams.q) {
      dispatch(productsSortPriceDown())
      dispatch(sortAdd(SORT.priceDown))
      setSearchParams({ sort: SORT.priceDown, filter: urlParams.filter })
    }
  }

  const filterOnlyDiscountHandler = () => {
    if (!urlParams.q) {
      dispatch(productsSortOnlyDiscount())
      dispatch(filterAdd(FILTER.onlyDiscounts))
      setSearchParams({ sort: urlParams.sort, filter: FILTER.onlyDiscounts })
    }
  }

  const sortRemoveAllHandler = () => {
    setSearchParams(undefined)
    dispatch(sortRemove())
    dispatch(filterRemove())
    dispatch(searchRemove())
    searchBarInput.value = ''
    queryClient.invalidateQueries({ queryKey: [allProductsGetQueryKey] })
  }

  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
    if (urlParams.q) setSearchParams({ q: urlParams.q })
  }, [])

  const getAllProductsSuccess = (prods) => {
    dispatch(productsSet(prods))
    //-----------------------------------------------------
    if (urlParams.q) setSearchParams({ q: urlParams.q })
    else {
      switch (urlParams.sort) {
        case SORT.priceDown:
          dispatch(sortAdd(SORT.priceDown))
          dispatch(productsSortPriceDown())
          urlTemp = { sort: SORT.priceDown }
          break
        case SORT.priceUp:
          dispatch(sortAdd(SORT.priceUp))
          dispatch(productsSortPriceUp())
          urlTemp = { sort: SORT.priceUp }
          break
        default: break
      }
      if (urlParams.filter === FILTER.onlyDiscounts) {
        dispatch(filterAdd(FILTER.onlyDiscounts))
        dispatch(productsSortOnlyDiscount())
        urlTemp = { ...urlTemp, filter: FILTER.onlyDiscounts }
      }
      setSearchParams(urlTemp)
    }

    //----------------------------------------------
  }

  const { data, isLoading } = useQuery({
    queryKey: [allProductsGetQueryKey],
    queryFn: () => api.getAllProductsRequest(token),
    onSuccess: (response) => getAllProductsSuccess(response.products),
  })

  /* в queryFn должны указать ссылку на функцию, которая возвращает промис. Но НЕ вызов функции
  > результат - объект, в котором есть ключ data. В него попадает все, что приходит из функции, указанной в queryFn.
  > в примере функция заведена const getAllContacts=()=> fetch('..').then ((res) => res.json())
  > const {data: contacts, isLoading} - переименование data в библиотеке в contacts в коде
  > эта штука возвращает кучу всяких is-: isLoading, isError, isFEtched и многое другое
  */

  if (isLoading) return <p>Грузимся-грузимся</p>

  return (
    <div className={prodStyles.pageContainer}>
      <div className={prodStyles.sortContainer}>
        <div
          className={`${prodStyles.sortBubbles} ${!(urlParams.sort || urlParams.filter || urlParams.q) && prodStyles.sortBubblesSelected} `}
          onClick={sortRemoveAllHandler}
        >
          Все товары
        </div>
        <div
          className={`${prodStyles.sortBubbles} ${urlParams.sort === SORT.priceUp && prodStyles.sortBubblesSelected} ${urlParams.q && prodStyles.sortBubblesBlocked}`}
          onClick={sortPriceUpHandler}
        >
          По возрастанию цены
        </div>
        <div
          className={`${prodStyles.sortBubbles} ${urlParams.sort === SORT.priceDown && prodStyles.sortBubblesSelected} ${urlParams.q && prodStyles.sortBubblesBlocked}`}
          onClick={sortPriceDownHandler}
        >
          По убыванию цены

        </div>
        <div className={`${prodStyles.sortBubbles} ${urlParams.filter === FILTER.onlyDiscounts && prodStyles.sortBubblesSelected} ${urlParams.q && prodStyles.sortBubblesBlocked}`} onClick={filterOnlyDiscountHandler}>
          Только со скидками
        </div>
      </div>

      {isLoading ? <p>Грузимся</p>
        : <ProductCards products={products} />}
    </div>
  )
}

//       <p>{isFetching && 'Идет обновление'}</p>
/*
{discount: 15, stock: 10, available: true, pictures: 'https://react-learning.ru/image-compressed/1.jpg', likes: Array(38), …}
author: {name: 'Jam Kerry 2', about: 'Actor', avatar: 'https://nationaltoday.com/wp-content/uploads/2020/05/Yoda.jpg', _id: '622bd81b06c7d323b8ae4614', email: 'maxim_91@inbox.ru', …}
available: true
created_at: "2022-03-12T10:36:12.324Z"
description: "Описание demo"
discount
:
15
isPublished
:
true
likes
:
(38) ['622b6ffc09b12f80f4c10bc9', '622b6ffc09b12f80f4c10bdc', '622b6ffc09b12f80f4c10ba5', '625d69e60cdd7d3fd52f84ba', '625936220cdd7d3fd52f8314', '625c74b60cdd7d3fd52f84af', '624f266aae19f546dc083a51', '622bd81b06c7d323b8ae4614', '625870360cdd7d3fd52f82ec', '62696f5797fcd005ee671375', '6264468f438a77ca8f287762', '6269930997fcd005ee67139a', '6269579197fcd005ee671361', '6263c132438a77ca8f28771d', '62979411fd97250691adebe3', '624c50e47c57d93142703808', '62f170a96aa1910432828654', '622b6ffc09b12f80f4c10baa', '636a510659b98b038f779cf4', '636a510759b98b038f779d27', '627aa2b8fd97250691ade93f', '622b6ffc09b12f80f4c10bc0', '636a510759b98b038f779d12', '638cbf1159b98b038f779d7e', '636a510759b98b038f779d26', '63a15ac159b98b038f77a1ae', '63a15b5b59b98b038f77a1af', '63a1f31259b98b038f77a1cc', '63a836c959b98b038f77a339', '636a510759b98b038f779d10', '638e460d59b98b038f779d98', '636a510759b98b038f779d16', '63b40cf159b98b038f77a47a', '63b157d259b98b038f77a3f5', '636a510659b98b038f779d09', '63aaf3f759b98b038f77a38c', '6395ee2559b98b038f779e89', '636a510759b98b038f779d1e']
name
:
"Желудки утиные сушено-вяленые"
pictures
:
"https://react-learning.ru/image-compressed/1.jpg"
price
:
4500
reviews
:
(42) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
stock
:
10
tags
:
(2) ['new', 'sale']
updated_at
:
"2023-01-06T07:36:13.586Z"
wight
:
"100 г"
__v
:
0
_id
:
"622c779c77d63f6e70967d1c"
[[Prototype]]
:
Object
*/
