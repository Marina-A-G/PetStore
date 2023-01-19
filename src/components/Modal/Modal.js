/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// import ReactDOM from 'react-dom/client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import modalStyles from './modal.module.scss'

function ModalContent({ closeModal, children }) {
  useEffect(() => {
    const listenerHandler = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', listenerHandler)

    return () => {
      document.removeEventListener('keydown', listenerHandler)
    }
  }, [closeModal])
  // когда модалка открывается, вешаем слушателя на нажатие клавиши esc. Делаем ровно один раз при открытии.
  // тк closeModal используется внутри useEffectб то он должен стать зависимостью для useEffect
  return (
    <div className={modalStyles.modalContent}>
      {children}
      <button
        type="submit"
        onClick={closeModal}
        className={modalStyles.button}
      >
        Закрыть модалку
      </button>
    </div>
  )
}

// ({children}) - потмоу что эта модалка может использоваться для разных целей
export function Modal({ isOpen = false, closeModal, children }) {
  if (!isOpen) return null

  const clickHandler = (event) => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  return createPortal(
    <div onClick={clickHandler} className={modalStyles.modalWrapper}>
      <ModalContent closeModal={closeModal}>
        {children}
      </ModalContent>
    </div>,
    // что там будет рендериться
    document.getElementById('modal-root'),
  // где именно будет рендерится модалка
  // в index.html есть div с id='modal-root'
  )
}
// вообще здесь стандартный ()=> {  return ...}, но eslint сократил это вот до такой формы

/* Зачем делаем: нам нужно, чтобы компонент со страницы пропадал, чтобы при размонтировании удалить навешанный на нажитие клавиши eventListener.
Компонент modal не пропадает. Он может возвращать null, но на странице он как есть, так и остается. А нам нужно, чтобы компонент полностью размонтировался.
Для этого создаем новый компонент, который будет хранить контент модалки. И он будет размонтироваться. Когда будет передаваться isOpen=false, будет возвращаться null, а сам компонент, получается, рендериться не будет.
*/
