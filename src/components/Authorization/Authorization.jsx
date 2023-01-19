/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, useNavigate } from 'react-router-dom'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import authStyles from './authorization.module.scss'
import { useUserContext } from '../../contexts/UserContext'
import { TokenLSkey } from '../../utils/constants'
import { api } from '../../classes/APIclass'

const ERROR_MESSAGE = 'Надо заполнить!'

export function Authorization() {
  console.log('Authorization renders')
  const queryClient = useQueryClient()
  const { user, setUser } = useUserContext()
  const navigate = useNavigate()

  const userAuthSuccess = (response) => {
    const LSdata = {
      email: response.data.email,
      token: response.token,
    }
    console.log({ LSdata })
    localStorage.setItem(TokenLSkey, JSON.stringify(LSdata))
    setUser(response.data)
    navigate('products/')
  }

  const userAuthError = (errMessage) => {
    alert(`Ошибка:  ${errMessage}. Попробуйте еще раз или зарегистрируйтесь.`)
  }

  const { mutateAsync: userAuthHandler } = useMutation({
    mutationFn: (authData) => api.authUserRequest(authData),
    onSuccess: (response) => { userAuthSuccess(response) },
    // eslint-disable-next-line max-len
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
      userAuthError(errResp.message)
    },
  })

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
          const authData = { email: values.email, password: values.password }
          userAuthHandler(authData)
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

token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2IxYWZkNDU5Yjk4YjAzOGY3N2EzZjYiLCJncm91cCI6InNtOCIsImlhdCI6MTY3MzEyNTA2OCwiZXhwIjoxNzA0NjYxMDY4fQ.MwNw7Wdwt_OnD30irrSAQQXDZHa2xcEX_KMr7UfE3Uc"

*/

/*
  const queryClient = useQueryClient() // получаем нашего query-клиента через контекст

  const { mutateAsync: userAuthHandler } = useMutation({
    mutationFn: (email, password) => api.authUserRequest(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [allProductsQueryKey] })
    },
  }) */
// каждый раз, когда будем выполнять запрос, будем обновлять запросы, перечисленные в queryKey. По сути, объявляем их всех устаревшими, и все они будут выполнены заново
// mutateAsync - если надо обязательно дождаться завершения выполнения функции, чтобы потом сделать что-то еще. Дальше const fun = async() => {await mutateAsync() }
// mutate - если не нужно дожидаться окончания.
