/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import regStyles from './registration.module.scss'
import { useUserContext } from '../../contexts/UserContext'

const ERROR_MESSAGE = 'Надо заполнить!'

export function Registration() {
  const { regUser } = useUserContext()
  // const { regUser } = useContext(UserContext)

  return (
    <div>
      <h2>Страничка регистрации</h2>
      <Formik
        initialValues={{
          firstName: '',
          email: '',
          password: '',
          checkbox: false, // added for our checkbox
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Уложитесь в 15 символов, пожалуйста!')
            .required(ERROR_MESSAGE),
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
          console.log('reg: values', { values })
          regUser(values.email, values.password)
        }}
      >
        <Form className={regStyles.formContainer}>
          <Field
            className={regStyles.formField}
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Имя-фамилия-ник-псевдоним-... и даже кличка"
          />
          <ErrorMessage
            name="firstName"
            className={regStyles.formErrorMessage}
            component="span"
          />
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
        <Link to="/">сюда за авторизацией</Link>
      </p>
    </div>
  )
}
