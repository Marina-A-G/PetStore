import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext, useUserHelperContext } from '../../contexts/UserContext'

export function UserData() {
  const { user } = useUserContext()
  const { setUser, getUserDataRequest } = useUserHelperContext()
  // const { user, setUser, getUserDataRequest } = useContext(UserContext)
  console.log('user from userData-1')
  console.log(user)

  useEffect(() => {
    getUserDataRequest().then((response) => {
      setUser(response)
      console.log('response in UserData')
      console.log(response)
    })
  }, [])

  if (typeof user === 'undefined') {
    return <div />
  }
  return (
    <div>
      Данные юзверя
      <br />

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
