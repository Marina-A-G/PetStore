/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDispatch } from 'react-redux'
import {
  cartChangeProductQuantityAC,
  cartRemoveProductAC,
} from '../../ReduxClear/actionCreators/cartAC'
import cartStyles from './cart.module.scss'
// import picDelete from './iconDelete.png'

export function CartItem({ item }) {
  const dispatch = useDispatch()

  const increaseQuantityHandler = () => {
    if (item.quantity < item.stock) {
      dispatch(cartChangeProductQuantityAC(item._id, item.quantity + 1))
    }
  }

  const decreaseQuantityHandler = () => {
    if (item.quantity > 1) {
      dispatch(cartChangeProductQuantityAC(item._id, item.quantity - 1))
    }
  }

  const deleteProductHandler = () => {
    dispatch(cartRemoveProductAC(item._id))
  }

  return (
    <div className={cartStyles.cartItemContainer}>
      <img src={item.pictures} alt={item.name} className={cartStyles.cartItemPicture} />

      <div className={cartStyles.cartItemName}>{item.name}</div>
      <div className={cartStyles.cartItemQuantityBlock}>
        <button
          type="button"
          className={cartStyles.cartButton}
          onClick={decreaseQuantityHandler}
        >
          -
        </button>
        <input
          name="quantity"
          min="0"
          max={item.stock}
          className={cartStyles.cartQuantity}
          value={item.quantity}
          readOnly
        />
        <button
          type="button"
          className={cartStyles.cartButton}
          onClick={increaseQuantityHandler}
        >
          +
        </button>
        <button
          type="button"
          className={`${cartStyles.cartButton} ${cartStyles.cartButtonDelete}`}
          onClick={deleteProductHandler}
        />
        <br />
        {`В наличии: ${item.stock}`}
        <br />
        {`Цена: ${Math.round(item.price * (1 - item.discount / 100))}`}
        <br />
        {`Стоимость: ${item.quantity * Math.round(item.price * (1 - item.discount / 100))}`}
      </div>

    </div>

  )
}

//        <img src={picDelete} alt="Удалить товар" className={cartStyles.button} />
