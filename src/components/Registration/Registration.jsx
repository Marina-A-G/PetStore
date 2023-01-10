/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import regStyles from './registration.module.scss'
import { useUserContext } from '../../contexts/UserContext'
import { api } from '../../classes/APIclass'
import { TokenLSkey } from '../../utils/constants'

const ERROR_MESSAGE = 'Надо заполнить!'

export function Registration() {
  console.log('Registration renders')
  const { setUser } = useUserContext()
  const navigate = useNavigate()

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

          api.regUserRequest(values.email, values.password).then((response) => {
            if (typeof response.err !== 'undefined' || typeof response.error !== 'undefined') {
              console.log('response in regUser: ', response)
              // eslint-disable-next-line max-len, no-alert
              alert(`Ошибка:  ${response.message}. Попробуйте еще раз.`)
            } else {
              console.log('регистрация прошла успешно')
              setUser(response)
              api.authUserRequest(values.email, values.password).then((responseAuth) => {
                const LSdata = {
                  email: values.email,
                  token: responseAuth.token,
                }
                localStorage.setItem(TokenLSkey, JSON.stringify(LSdata))
                navigate('/user/')
              })
              // после регистрации сразу авторизация и получение токена, чтобы пользователь не успел задолбаться
            }
          }).catch(alert)
        }}
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
