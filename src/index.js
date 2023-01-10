import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Products } from './components/Products/Products'
import { Authorization } from './components/Authorization/Authorization'
import { Registration } from './components/Registration/Registration'
import { UserData } from './components/UserData/UserData'
import { UserEdit } from './components/UserEdit/UserEdit'
// import reportWebVitals from './reportWebVitals'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Authorization />,
      },
      {
        path: 'registration/',
        element: <Registration />,
      },
      {
        path: 'user/',
        element: <UserData />,
      },
      {
        path: 'user/edit/',
        element: <UserEdit />,
      },
      {
        path: 'products/',
        element: <Products />,
      },
    ],
  },
])
// эта функция создает роутинг. Принимает массив объектов

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

/*
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
