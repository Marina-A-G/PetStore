import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import * as Yup from 'yup'
import { useUserContext } from '../../contexts/UserContext'
import ueStyles from './useredit.module.scss'

export function UserEdit() {
  const { user } = useUserContext()
  console.log('user from UserEdit')
  console.log(user)
  const ERROR_MESSAGE = 'Надо заполнить!'

  return (
    <div className="container">
      <p>Расскажите нам о себе:</p>
      <Formik
        initialValues={{
          name: user.name,
          about: user.about,
          email: user.email,
          avatar: user.avatar,
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
        // ВЫЗОВ ЗАПРОСА НА РЕГИСТРАЦИЮ
          console.log('reg: values', { values })
          // regUser(values.email, values.password)
        }}
      >
        <Form className={ueStyles.formContainer}>
          <Field
            className={ueStyles.formField}
            label="Name"
            name="name"
            type="text"
            placeholder="Имя-фамилия-ник-псевдоним-... и даже кличка"
          />
          <ErrorMessage
            name="name"
            className={ueStyles.formErrorMessage}
            component="span"
          />
          <Field
            className={ueStyles.formField}
            label="Адрес электронной почты:"
            name="email"
            type="email"
            placeholder="_______@____.__"
          />
          <ErrorMessage
            name="email"
            className={ueStyles.formErrorMessage}
            component="span"
          />
          <Field
            className={ueStyles.formField}
            label="Придумайте свой пароль:"
            name="password"
            type="password"
            placeholder="Придумайте свой пароль:"
          />
          <ErrorMessage
            name="password"
            className={ueStyles.formErrorMessage}
            component="span"
          />

          <button
            type="submit"
            className={ueStyles.formField}
          >
            Обновить данные обо мне!
          </button>
        </Form>
      </Formik>

    </div>
  )
}
