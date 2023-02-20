/* eslint-disable react/no-unescaped-entities */
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../Modal/Modal'
import { ModalForm } from '../Modal/ModalForm'
import footerStyles from './footer.module.scss'

function Footer() {
  // console.log('Footer render')
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const message = 'чё, правда прошло??'

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const addProductClickHandler = () => {
    navigate('products/add')
  }

  return (
    <>
      <footer className={footerStyles.container}>
        <h2 className={footerStyles.text}>
          Хрум-чавк!
        </h2>
        <button
          type="button"
          className={footerStyles.button}
          title="Пользователь"
          onClick={addProductClickHandler}
        >
          Добавить новый товар
        </button>
        <button
          type="submit"
          className={footerStyles.button}
          onClick={openModal}
          hidden
        >
          Кнопка. Для модалки. "Тест" и "Не трогать" :)
        </button>
      </footer>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h1>From modal</h1>
        <ModalForm message={message} />
      </Modal>
    </>
  )
}

export {
  Footer,
}

// открытие-закрытие модалки:
