import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from '../Modal/Modal'
import { ModalForm } from '../Modal/ModalForm'
import footerStyles from './footer.module.scss'

function Footer() {
  console.log('Footer render')
  const token = useSelector((store) => store.token)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const message = 'чё, правда прошло??'

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <footer className={footerStyles.container}>
        <h1 className={footerStyles.text}>
          Это footer
        </h1>
        <p className={footerStyles.token}>{token}</p>
        <button
          type="submit"
          className={footerStyles.button}
          onClick={openModal}
        >
          Кнопка. Для модалки.
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
