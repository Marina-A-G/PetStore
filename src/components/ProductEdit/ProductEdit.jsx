/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import prodAddStyles from './productEdit.module.scss'
import { api } from '../../classes/APIclass'
import { allProductsGetQueryKey } from '../../utils/queryKeys'

export function ProductEdit() {
  const token = useSelector((store) => store.token)
  const navigate = useNavigate()
  const ERROR_MESSAGE = 'Надо заполнить!'
  const queryClient = useQueryClient()
  const { productID } = useParams()

  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  const cancelHandler = () => {
    navigate('/products/')
  }

  const { data: productData, isLoading } = useQuery({
    queryKey: [productID],
    queryFn: () => api.getProductDataRequest(productID, token),
    onSuccess: (response) => {
      console.log(response)
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  const { mutateAsync: productEditHandler } = useMutation({
    mutationFn: (updProdData) => api.editProductDataRequest(updProdData, productID, token),
    onSuccess: () => {
      // console.log('изменены данные товара с id', response._id)
      queryClient.invalidateQueries({ queryKey: [allProductsGetQueryKey, productID] })
      navigate(`/products/${productID}`)
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  if (isLoading) return <p>Уточняем данные...</p>

  return (
    <>
      <h1>Изменение данных о товаре</h1>
      <div className="container">
        <p>Поменяйте данные о товаре:</p>
        <br />
        <Formik
          initialValues={{
            pictures: productData.pictures,
            name: productData.name,
            price: productData.price,
            discount: productData.discount,
            stock: productData.stock,
            wight: productData.wight,
            description: productData.description,
          }}
          validationSchema={Yup.object({
            pictures: Yup.string(),
            name: Yup.string()
              .required(ERROR_MESSAGE),
            price: Yup.number()
              .min(1, 'В подарок хотите отдать? И приплатить, чтобы забрали?)')
              .required(ERROR_MESSAGE),
            discount: Yup.number()
              .max(99, 'Скидка не может быть больше 100%')
              .min(0, 'Скидка не может быть отрицательной'),
            stock: Yup.number()
              .min(0, 'А как это у вас на складе отрицательное количество товара?'),
            wight: Yup.string(),
            description: Yup.string()
              .required(ERROR_MESSAGE),
          })}
          onSubmit={(values) => {
            // ВЫЗОВ ЗАПРОСА НА ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
            console.log('prod: values', { values })

            const newProdData = {
              pictures: values.pictures,
              name: values.name,
              price: values.price,
              discount: values.discount,
              stock: values.stock,
              wight: values.wight,
              description: values.description,
            }
            productEditHandler(newProdData)
          }}
        >
          <Form className={prodAddStyles.formContainer}>
            <label htmlFor="pictures">URL изображения товара: </label>
            <Field
              id="pictures"
              className={prodAddStyles.formField}
              name="pictures"
              type="text"
            />
            <label htmlFor="name">Название товара: </label>
            <Field
              id="name"
              className={prodAddStyles.formField}
              name="name"
              type="text"
            />
            <ErrorMessage
              name="name"
              className={prodAddStyles.formErrorMessage}
              component="span"
            />
            <label htmlFor="price">Цена 1 ед.: </label>
            <Field
              id="price"
              className={prodAddStyles.formField}
              name="price"
              type="number"
            />
            <ErrorMessage
              name="price"
              className={prodAddStyles.formErrorMessage}
              component="span"
            />
            <label htmlFor="discount">
              Скидка (если скидки нет, ставьте 0):
            </label>
            <Field
              id="discount"
              className={prodAddStyles.formField}
              name="discount"
              type="number"
            />
            <ErrorMessage
              name="discount"
              className={prodAddStyles.formErrorMessage}
              component="span"
            />
            <label htmlFor="stock">
              Количество в наличии:
            </label>
            <Field
              id="stock"
              className={prodAddStyles.formField}
              name="stock"
              type="number"
            />
            <ErrorMessage
              name="stock"
              className={prodAddStyles.formErrorMessage}
              component="span"
            />
            <label htmlFor="wight">Вес единицы товара: </label>
            <Field
              id="wight"
              className={prodAddStyles.formField}
              name="wight"
              type="text"
            />
            <ErrorMessage
              name="wight"
              className={prodAddStyles.formErrorMessage}
              component="span"
            />
            <label htmlFor="description">Описание товара: </label>
            <Field
              className={prodAddStyles.formField}
              name="description"
              type="text"
            />
            <ErrorMessage
              name="description"
              className={prodAddStyles.formErrorMessage}
              component="span"
            />
            <br />
            <button
              type="submit"
              className={prodAddStyles.formButton}
            >
              Обновить данные!
            </button>
          </Form>
        </Formik>
        <button
          type="button"
          className={prodAddStyles.formButton}
          onClick={cancelHandler}
        >
          Что-то я передумал(а) менять!
        </button>
      </div>
    </>
  )
}

/*
    "pictures": "https://react-learning.ru/image-compressed/2.jpg", // string
    "name": "Куриные желудочки для собак", // string, обязательное
    "price": 450, // number, обязательное
    "discount": 10, // number
    "stock": 10, // number
    "wight": "100 г", // string
    "description": "Описание demo", // string, обязательное
    */
