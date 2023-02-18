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
            name: Yup.string()
              .max(15, 'Уложитесь в 15 символов, пожалуйста!')
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
            <label htmlFor="name">Имя: </label>
            <Field
              id="name"
              className={prodAddStyles.formField}
              label="Name"
              name="name"
              type="text"
            />
            <ErrorMessage
              name="name"
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
              Обновить данные обо мне!
            </button>
          </Form>
        </Formik>
        <button
          type="button"
          className={prodAddStyles.formButton}
          onClick={cancelHandler}
        >
          Не надо менять, всё и так прекрасно!
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
