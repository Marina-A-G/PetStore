import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../classes/APIclass'
// import { Link } from 'react-router-dom'
// import { ProductsContext } from '../../contexts/ProductsContext'
import { ProductCards } from '../productCards/ProductCards'
import prodStyles from './products.module.scss'

export function Products() {
  console.log('Products render')

  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  // принимает значение по умолчанию для состояния
  // возвращает 1 сущность - массив с 2 элементами: 1 - наша сущность, 2 - функция, с помощью которой можем менять состояние. И менять сущность только с помощью нее.

  useEffect(() => {
    const token = api.checkTokenAvailabilityInLS()
    if (token) {
      api.getAllProductsRequest(token).then((response) => {
        console.log('request for Products from Products')
        // console.log(data.products[0])
        setProducts(response.products)
      })
    } else {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  return (
    <div className={prodStyles.pageContainer}>
      <h1>Все товары</h1>
      <ProductCards products={products} />
    </div>
  )
}

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
