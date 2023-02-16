/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import regStyles from './registration.module.scss'
import { useUserContext } from '../../contexts/UserContext'
import { api } from '../../classes/APIclass'
import { TokenLSkey } from '../../utils/constants'
import { tokenAdd } from '../../ReduxToolkit/slices/tokenSlice'

const ERROR_MESSAGE = 'Надо заполнить!'

export function Registration() {
  console.log('Registration renders')
  const { setUser } = useUserContext()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userRegSuccess = (response, regData) => {
    // console.log('регистрация прошла успешно')
    setUser(response)

    api.authUserRequest(regData).then((responseAuth) => {
      const LSdata = {
        email: responseAuth.data.email,
        token: responseAuth.token,
      }
      console.log({ LSdata })
      localStorage.setItem(TokenLSkey, JSON.stringify(LSdata))
      dispatch(tokenAdd(responseAuth.token))
      navigate('/user/')
    })
      .catch((errMessage) => alert(`Ошибка:  ${errMessage}.`))
  }

  const userRegError = (errMessage) => {
    alert(`Ошибка:  ${errMessage}. Попробуйте еще раз.`)
  }

  const { mutateAsync: userRegHandler } = useMutation({
    mutationFn: (regData) => api.regUserRequest(regData),
    onSuccess: (response, regData) => { userRegSuccess(response, regData) },
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
      userRegError(errResp.message)
    },
  })

  return (
    <div>
      <h2>Страничка регистрации</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
          checkbox: false,
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Что-то не похоже это на адрес электронной почты...`')
            .required(ERROR_MESSAGE),
          password: Yup.string()
            .min(5, 'Несерьёзно! Хотя бы 5 символов!')
            .required(ERROR_MESSAGE),
          checkbox: Yup.boolean()
            .required(ERROR_MESSAGE)
            .oneOf([true], 'Без согласия мы далеко не уедем'),
        })}
        onSubmit={(values) => {
        // ВЫЗОВ ЗАПРОСА НА РЕГИСТРАЦИЮ
          // console.log('reg: values', { values })
          const regData = { email: values.email, password: values.password }
          userRegHandler(regData)
        }}
        // после регистрации сразу авторизация и получение токена, чтобы пользователь не успел задолбаться
      >
        <Form className={regStyles.formContainer}>
          <Field
            className={regStyles.formField}
            label="Адрес электронной почты:"
            name="email"
            type="email"
            placeholder="_______@____.__"
          />
          <ErrorMessage
            name="email"
            className={regStyles.formErrorMessage}
            component="span"
          />
          <Field
            className={regStyles.formField}
            label="Придумайте свой пароль:"
            name="password"
            type="password"
            placeholder="Придумайте свой пароль:"
          />
          <ErrorMessage
            name="password"
            className={regStyles.formErrorMessage}
            component="span"
          />
          <label>
            <Field
              className={regStyles.formField}
              label="Я согласен(-на) на обработку персональных данных, что бы это ни значило"
              type="checkbox"
              name="checkbox"
            />
            <ErrorMessage
              name="checkbox"
              className={regStyles.formErrorMessage}
              component="span"
            />
            Я согласен(-на) на обработку персональных данных, что бы это ни значило
          </label>
          <button
            type="submit"
            className={regStyles.formField}
          >
            Регистрируюсь!
          </button>
        </Form>
      </Formik>
      <p>
        Вспомнили, что уже регистрировались? Тогда вот
        <Link to="/"> сюда за авторизацией</Link>
      </p>
    </div>
  )
}

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
