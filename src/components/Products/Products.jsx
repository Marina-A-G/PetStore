/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../classes/APIclass'
import { ProductCards } from '../productCards/ProductCards'
import prodStyles from './products.module.scss'
import { productsSet } from '../../ReduxToolkit/slices/productSlice'

export const allProductsQueryKey = 'allProducts'
const URLbase = 'https://api.react-learning.ru/'
const URLproductsAll = 'products/'

export function Products() {
  // onsole.log('Products render')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = useSelector((store) => store.token)
  // const {products, status, error} = useSelector(getProductsSliceSelector)
  const products = useSelector((store) => store.products)

  useEffect(() => {
    // const token = api.checkTokenAvailabilityInLS()
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  // dispatch(getAllProductsFromServer(token))

  const getAllProductsSuccess = (prods) => {
    dispatch(productsSet(prods))
  }

  const { data, isLoading } = useQuery({
    queryKey: [allProductsQueryKey],
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
  // if (status===PRODUCTS_STATUSES.loading) return <p>Грузимся-грузимся</p>
  // if (status===PRODUCTS_STATUSES.failed) return <><p>Ошибка {error}</p> <button onClick={()=>dispatch(getAllProductsFromServer(token))}>Refetch</button></>
  // if (!products.length) return <p>Товаров неть...</p>

  return (
    <div className={prodStyles.pageContainer}>

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
