// элемент, который подсовывается в модалку. В примере вебинара сюда засунули уже существующий компонент <Form> с реализованной реакцией на ввод каждого символа в инпут
import modalStyles from './modal.module.scss'

export function ModalForm({ message }) {
  // modalFormContainer = wr в вебинаре
  return (
    <div className={modalStyles.modalFormContainer}>
      <h2>{message}</h2>
      <input
        type="text"
        placeholder={message}
        className="form-control"
      />
      <button type="submit" className={modalStyles.button}>
        Add
      </button>
    </div>
  )
}
