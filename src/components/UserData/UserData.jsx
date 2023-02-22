// import { useEffect } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { api } from '../../classes/APIclass'
import { useUserContext } from '../../contexts/UserContext'
import { userDataGetQueryKey } from '../../utils/queryKeys'

export function UserData() {
  const { setUser } = useUserContext()
  const navigate = useNavigate()
  const token = useSelector((store) => store.token)

  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  const { data: userData, isLoading } = useQuery({
    queryKey: [userDataGetQueryKey],
    queryFn: () => api.getUserDataRequest(token),
    onSuccess: (response) => {
      setUser(response)
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  if (isLoading) return <p>Уточняем данные...</p>

  return (
    <div>
      Вот что мы знаем о Вас:
      <br />
      <img src={userData.avatar} alt="Ваш аватар" width="100px" />
      <br />
      {userData.name}
      <br />
      {userData.about}
      <br />
      {userData.email}
      <br />
      Что-то неверно? Хотите дополнить? Тогда
      {' '}
      <Link to="edit/"> измените информацию о себе.</Link>
      <br />
    </div>
  )
}

/*
Должно прийти на запрос по токену:
   "name": "Иван Иванов",
    "about": "Писатель",
    "avatar": "https://react-learning.ru/image-compressed/default-image.jpg",
    "_id": "63b1afd459b98b038f77a3f6",
    "email": "a@b.ru",
    "group": "sm8",
    "__v": 0
*/
