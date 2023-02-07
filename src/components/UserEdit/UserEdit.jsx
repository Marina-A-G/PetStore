/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../classes/APIclass'
import { useUserContext } from '../../contexts/UserContext'
import ueStyles from './useredit.module.scss'
import { userDataGetQueryKey } from '../../utils/queryKeys'

export function UserEdit() {
  const { setUser } = useUserContext()
  const navigate = useNavigate()
  const ERROR_MESSAGE = 'Надо заполнить!'
  const token = useSelector((store) => store.token)

  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  const { data: userData, isLoading } = useQuery({
    queryKey: [userDataGetQueryKey],
    queryFn: () => api.getUserDataRequest(token),
    onSuccess: (response) => {
      setUser(response)
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  const cancelHandler = () => {
    navigate('/user/')
  }

  const { mutateAsync: userEditHandler } = useMutation({
    mutationFn: (newData) => api.editUserDataRequest(newData, token),
    onSuccess: (response) => {
      console.log({ response })
      setUser(response)
      navigate('/user')
    },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  if (isLoading) return <p>Уточняем данные...</p>

  return (
    <div className="container">
      <p>Расскажите нам о себе:</p>
      <img src={userData.avatar} alt="Ваш аватар" width="100px" />
      <br />
      <button
        type="button"
        className={ueStyles.formButton}
      >
        Сменить аватар. (пока не жать - не работает)
      </button>
      <br />
      <br />
      <Formik
        initialValues={{
          name: userData.name,
          about: userData.about,
          email: userData.email,
          avatar: userData.avatar,
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

          const newData = { name: values.name, about: values.about }
          userEditHandler(newData)
        }}
      >
        <Form className={ueStyles.formContainer}>
          <label htmlFor="name">Имя: </label>
          <Field
            id="name"
            className={ueStyles.formField}
            label="Name"
            name="name"
            type="text"
          />
          <ErrorMessage
            name="name"
            className={ueStyles.formErrorMessage}
            component="span"
          />
          <label htmlFor="about">О себе: </label>
          <Field
            className={ueStyles.formField}
            label="About"
            name="about"
            type="text"
          />
          <ErrorMessage
            name="about"
            className={ueStyles.formErrorMessage}
            component="span"
          />
          <label htmlFor="email">Адрес электронной почты: </label>
          <Field
            className={ueStyles.formField}
            label="Адрес электронной почты:"
            name="email"
            type="email"
            disabled
          />
          <br />
          <button
            type="submit"
            className={ueStyles.formButton}
          >
            Обновить данные обо мне!
          </button>
        </Form>
      </Formik>
      <button
        type="button"
        className={ueStyles.formButton}
        onClick={cancelHandler}
      >
        Не надо менять, всё и так прекрасно!
      </button>
    </div>
  )
}
