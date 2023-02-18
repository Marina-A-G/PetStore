/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../classes/APIclass'
import favStyles from './favourites.module.scss'
import { ProductCards } from '../productCards/ProductCards'

export function Favourites() {
  const favourites = useSelector((store) => store.favourites)
  const navigate = useNavigate()
  const token = useSelector((store) => store.token)

  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  const { data: favData = [], isLoading } = useQuery({
    queryKey: ['favourites', favourites],
    queryFn: () => api.getProductsByIDs(favourites, token),
  })

  const favExtended = favourites.map((item) => {
    const itemFromServer = favData.find((itemFind) => itemFind._id === item)
    return {
      item,
      ...itemFromServer,
    }
  })
  /*
  const showFavHandler = () => {
    console.log(favourites)
  }

  const showFavExtHandler = () => {
    console.log(favExtended)
  }
*/
  if (!favourites.length) {
    return (
      <div>
        <h2>Избранное</h2>
        <br />
        Так вы пока ничего не выбрали...
        <br />
        Посмотрите
        <Link to="/products/"> здесь </Link>
        , может, что понравится)
      </div>
    )
  }
  if (isLoading) return <p>Грузимся-грузимся</p>

  return (
    <>
      <h2>Избранное</h2>
      <div className={favStyles.pageContainer}>
        <ProductCards products={favExtended} />
      </div>
    </>

  )
}
