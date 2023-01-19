import React, { useContext } from 'react'
import { useUser } from '../customHooks/useUser'

export const UserContext = React.createContext()
// export const UserHelperContext = React.createContext()

export function UserContextProvider({ children }) {
  const userData = useUser()

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
