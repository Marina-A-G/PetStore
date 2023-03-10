/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from 'react-router-dom'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
// все сущности библиотеки yup мы импортируем и даем название Yup
import authStyles from './authorization.module.scss'
import { useUserContext } from '../../contexts/UserContext'
import { TokenLSkey } from '../../utils/constants'
import { api } from '../../classes/APIclass'

const ERROR_MESSAGE = 'Надо заполнить!'

export function Authorization() {
  console.log('Authorization renders')
  const { setUser } = useUserContext()
  const navigate = useNavigate()

  return (
    <div>
      <h2>
        Тсссс! Это секретный магазин с товарами только для...
        <br />
        настоящих животных!
      </h2>
      <h2>Поэтому авторизуйтесь, чтобы зайти.</h2>

      <Formik
        initialValues={{
          firstName: '',
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Что-то не похоже это на адрес электронной почты...`')
            .required(ERROR_MESSAGE),
          password: Yup.string()
            .min(5, 'Несерьёзно! Хотя бы 5 символов!')
            .required(ERROR_MESSAGE),
        })}
        onSubmit={(values) => {
          // ВЫЗОВ ЗАПРОСА НА АВТОРИЗАЦИЮ
          api.authUserRequest(values.email, values.password).then((response) => {
            if (typeof response.err !== 'undefined' || typeof response.error !== 'undefined') {
              console.log('response in auth: ', response)
              // eslint-disable-next-line max-len, no-alert
              alert(`Ошибка:  ${response.message}. Попробуйте еще раз или зарегистрируйтесь.`)
            } else {
              const LSdata = {
                email: values.email,
                token: response.token,
              }
              localStorage.setItem(TokenLSkey, JSON.stringify(LSdata))
              console.log('authUser, response: ', response)
              setUser(response.data)
              navigate('products/')
            }
          }).catch(alert)
        }}
      >
        <Form className={authStyles.formContainer}>
          <Field
            className={authStyles.formField}
            name="email"
            type="email"
            placeholder="_______@____.__"
          />
          <ErrorMessage
            name="email"
            className={authStyles.formErrorMessage}
            component="span"
          />
          <Field
            className={authStyles.formField}
            name="password"
            type="password"
            placeholder="Ваш пароль:"
          />
          <ErrorMessage
            name="password"
            className={authStyles.formErrorMessage}
            component="span"
          />

          <button
            type="submit"
            className={authStyles.formField}
          >
            Авторизуюсь!
          </button>
        </Form>

      </Formik>
      <h2>
        А если вы у нас еще не были, то
        <Link to="/registration"> зарегистрируйтесь:</Link>
      </h2>
    </div>
  )
}

// <Navigate to="/products" />

/*
 validationSchema={Yup.object({
  обращаемся к библиотеке Yup - это объект, у него есть ключ object - это метод.
  И этот метод принимает некоторый объект в себя
  Этот внутренний объект выполняет валидацию над ключами формы        */

/*
Ответ при ошибке:
{message: 'Неправильные почта или пароль', err: {…}}
err:
  statusCode: 401
[[Prototype]] Object
message  "Неправильные почта или пароль"
[[Prototype]]: Object

Ответ при авторизации:
{data: {…}, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…DY4fQ.MwNw7Wdwt_OnD30irrSAQQXDZHa2xcEX_KMr7UfE3Uc'}
data:
  about: "Писатель"
  avatar: "https://react-learning.ru/image-compressed/default-image.jpg"
  email: "a@b.ru"
  group: "sm8"
  name: "Иван Иванов"
  __v: 0
  _id: "63b1afd459b98b038f77a3f6"
[[Prototype]]: Object
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IxYWZkNDU5Yjk4YjAzOGY3N2EzZjYiLCJncm91cCI6InNtOCIsImlhdCI6MTY3MzEyNTA2OCwiZXhwIjoxNzA0NjYxMDY4fQ.MwNw7Wdwt_OnD30irrSAQQXDZHa2xcEX_KMr7UfE3Uc"
[[Prototype]]:Object
*/
