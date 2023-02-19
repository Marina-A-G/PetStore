/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import prodAddStyles from './productAdd.module.scss'
import { api } from '../../classes/APIclass'

export function ProductAdd() {
  const token = useSelector((store) => store.token)
  const navigate = useNavigate()
  const ERROR_MESSAGE = 'Надо заполнить!'

  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  /* const productAddHandler = (newProdData) => {
    console.log({ newProdData })
    const newProdFullData = {
      ...newProdData,
      available: true,
    }
    console.log({ newProdFullData })
  } */

  const cancelHandler = () => {
    navigate('/products/')
  }

  const { mutateAsync: productAddHandler } = useMutation({
    // eslint-disable-next-line max-len
    mutationFn: (newProdData) => api.addNewProductRequest({ ...newProdData, available: true }, token),
    onSuccess: (response) => {
      console.log({ response })
      console.log('товар добавлен с id ', response._id)
      navigate('/products/')
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  return (
    <>
      <h1>Добавление нового товара:</h1>
      <div className="container">
        <p>Заполните данные о новом товаре:</p>
        <br />
        <Formik
          initialValues={{
            pictures: '',
            name: '',
            price: '',
            discount: 0,
            stock: '',
            wight: '',
            description: '',
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
            productAddHandler(newProdData)
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
              Добавить товар!
            </button>
          </Form>
        </Formik>
        <button
          type="button"
          className={prodAddStyles.formButton}
          onClick={cancelHandler}
        >
          Что-то я передумал(а) добавлять!
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
