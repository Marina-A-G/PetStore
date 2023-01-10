// import { useEffect } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../classes/APIclass'
import { useUserContext } from '../../contexts/UserContext'

export function UserData() {
  // const { user } = useUserContext()
  // const { setUser, getUserDataRequest } = useUserHelperContext()
  // const { user, setUser, getUserDataRequest } = useUserContext()
  const { user, setUser } = useUserContext()
  const navigate = useNavigate()

  console.log('user from UserData')
  console.log(user)
  console.log(!Object.keys(user).length)

  useEffect(() => {
    if (!Object.keys(user).length) {
      const token = api.checkTokenAvailabilityInLS()
      if (!token) {
        alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
        navigate('/')
      } else {
        api.getUserDataRequest(token).then((response) => {
          if (typeof response.err !== 'undefined' || typeof response.error !== 'undefined') {
            console.log('response in UserData: ', response)
            // eslint-disable-next-line max-len, no-alert
            alert(`Ошибка:  ${response.message}. Попробуйте еще раз или зарегистрируйтесь.`)
            navigate('/')
          } else {
            console.log('response from UserData')
            console.log(response)
            setUser(response)
          }
        })
      }
    }
  })

  return (
    <div>
      Вот что мы знаем о Вас:
      <br />
      {user.name}
      <br />
      {user.about}
      <br />
      {user.email}
      <br />
      Что-то неверно? Хотите дополнить? Тогда
      {' '}
      <Link to="edit/"> измените информацию о себе.</Link>
      <br />
      <Link to="/products/">К товарам</Link>
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
