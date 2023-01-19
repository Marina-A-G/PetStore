import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { Products } from './components/Products/Products'
import { Authorization } from './components/Authorization/Authorization'
import { Registration } from './components/Registration/Registration'
import { UserData } from './components/UserData/UserData'
import { UserEdit } from './components/UserEdit/UserEdit'
// import reportWebVitals from './reportWebVitals'

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
// вот этот router в {} - {router} - это созданный const router=createBrowserRouter

/* TanStack query
создаем query-клиента и оборачиваем в него все приложение
*/

/*
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
