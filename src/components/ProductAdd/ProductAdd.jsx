/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import prodAddStyles from './productAdd.module.scss'

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

  const productAddHandler = (newProdData) => {
    console.log({ newProdData })
    const newProdFullData = {
      ...newProdData,
      available: true,
    }
    console.log({ newProdFullData })
  }

  const cancelHandler = () => {
    navigate('/products/')
  }

  /*
  const { mutateAsync: productAddHandler } = useMutation({
    mutationFn: (newProdData) => api.addNewProductRequest({...newProdData, available: true,}, token),
    onSuccess: (response) => {
      console.log({ response })
      console.log('товар добавлен с id ', response._id)
      navigate('products/')
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  }) */

  return (
    <>
      <h1>Добавление нового товара:</h1>
      <div className="container">
        <p>Заполните данные о новом товаре:</p>
        <br />
        <br />
        <Formik
          initialValues={{
            pictures: 'url, string',
            name: 'string, obligatory',
            price: 'number, obligatory',
            discount: 0,
            stock: 'number',
            wight: 'string',
            description: 'string, obligatory',
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

            about: Yup.string()
              .max(30, 'Уложитесь в 30 символов, пожалуйста!')
              .required(ERROR_MESSAGE),
          })}
          onSubmit={(values) => {
            // ВЫЗОВ ЗАПРОСА НА ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
            console.log('reg: values', { values })

            const newProdData = { name: values.name, about: values.about }
            productAddHandler(newProdData)
          }}
        >
          <Form className={prodAddStyles.formContainer}>
            <label htmlFor="pic">URL изображения товара: </label>
            <Field
              id="pic"
              className={prodAddStyles.formField}
              name="pic"
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

            <label htmlFor="about">О себе: </label>
            <Field
              className={prodAddStyles.formField}
              label="About"
              name="about"
              type="text"
            />
            <ErrorMessage
              name="about"
              className={prodAddStyles.formErrorMessage}
              component="span"
            />
            <label htmlFor="email">Адрес электронной почты: </label>
            <Field
              className={prodAddStyles.formField}
              label="Адрес электронной почты:"
              name="email"
              type="email"
              disabled
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
