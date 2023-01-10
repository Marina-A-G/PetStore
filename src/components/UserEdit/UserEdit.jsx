/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { api } from '../../classes/APIclass'
import { useUserContext } from '../../contexts/UserContext'
import ueStyles from './useredit.module.scss'

export function UserEdit() {
  const { user, setUser } = useUserContext()
  const navigate = useNavigate()
  console.log('user from UserEdit')
  console.log(user)
  const ERROR_MESSAGE = 'Надо заполнить!'

  const cancelHandler = () => {
    navigate('/user/')
  }

  return (
    <div className="container">
      <p>Расскажите нам о себе:</p>
      <img src={user.avatar} alt="Ваш аватар" width="100px" />
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
        // ВЫЗОВ ЗАПРОСА НА ИЗМЕНЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
          console.log('reg: values', { values })
          // regUser(values.email, values.password)
          api.editUserDataRequest(values.name, values.about).then((response) => {
            console.log(response)
            setUser(response)
            navigate('/user')
          })
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
