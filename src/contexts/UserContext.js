import React, { useContext } from 'react'
import { useUser } from '../customHooks/useUser'

export const UserContext = React.createContext()
// export const UserHelperContext = React.createContext()

export function UserContextProvider({ children }) {
  const userData = useUser()

  /* ответ при регистрации
  const user = {
    name: 'Иван Иванов',
    about: 'Писатель',
    avatar: 'https://react-learning.ru/image-compressed/default-image.jpg',
    isAdmin: false,
    _id: '63ae17be59b98b038f77a3f1',
    email: 'maxim01@mail.ru',
    group: 'group-7',
    __v: 0,
  } */
  // const value = {}

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  )
}
// value - те данные, которые хотим положить в контекст, котрые нужно зашарить между другими компонентами
// именно value, никак иначе называть нельзя
// можно положить только одно значение, поэтому если несколько, то {{ }}
// первые {} говорят, что в них будет находиться какое-то js-выражение
// вторые {} обертывают все то, что надо туда положить, в одну сущность

export const useUserContext = () => useContext(UserContext)
// export const useUserHelperContext = () => useContext(UserHelperContext)

/*
  return (
    <UserContext.Provider value={user}>
      <UserHelperContext.Provider value={userHelperValue}>
        {children}
      </UserHelperContext.Provider>
    </UserContext.Provider>
  ) */
