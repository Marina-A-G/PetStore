/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux'
import { cartAddProduct } from '../../ReduxToolkit/slices/cartSlice'
import cardStyles from './productCards.module.scss'
import picFav from './heartFilled.png'
import picNotFav from './heartOutline.png'
import {
  favouritesAddProduct,
  favouritesRemoveProduct,
} from '../../ReduxToolkit/slices/favouritesSlice'

export function ProductCard({ product }) {
  const dispatch = useDispatch()
  const favourites = useSelector((store) => store.favourites)
  let isFav
  if (favourites.indexOf(product._id) === -1) {
    isFav = false
  } else isFav = true

  const changeFavStatusHandler = () => {
    console.log('жмак!', product._id, isFav)
    if (isFav) {
      dispatch(favouritesRemoveProduct(product._id))
    } else {
      dispatch(favouritesAddProduct(product._id))
    }
    isFav = !isFav
  }

  const addToCartHandler = (productId, e) => {
    // eslint-disable-next-line max-len
    if ((e.target.parentNode.children.quantity.value) > 0) {
      const quantity = Number(e.target.parentNode.children.quantity.value) <= product.stock
        ? Number(e.target.parentNode.children.quantity.value)
        : product.stock
      dispatch(cartAddProduct(product._id, quantity))
    }
  }

  const priceInitial = product.discount === 0 ? '' : product.price
  const priceFinal = Math.round(product.price * (1 - product.discount / 100))

  return (
    <div className={cardStyles.cardContainer}>
      <img src={product.pictures} alt={product.name} className={cardStyles.cardPicture} />
      {product.discount > 0
            && <div className={cardStyles.discount}>{`${product.discount}%`}</div>}
      <img
        src={isFav ? picFav : picNotFav}
        alt=""
        className={cardStyles.cardFav}
        onClick={changeFavStatusHandler}
      />
      <div className={cardStyles.cardPrice}>
        <span className={cardStyles.priceInitial}>{`${priceInitial}     `}</span>
        <span className={cardStyles.priceFinal}>{`${priceFinal} р.`}</span>
      </div>
      <div className={cardStyles.cardName}>
        {product.name}
      </div>
      <div className={cardStyles.cardName}>
        {`В наличии: ${product.stock}`}
      </div>
      <div className={cardStyles.cardCartElementsContainer}>
        <input
          name="quantity"
          type="number"
          min="0"
          max={product.stock}
          className={cardStyles.cardCartInput}
          placeholder="0"
        />
        <button
          type="button"
          className={cardStyles.cardCartButton}
          onClick={(e) => addToCartHandler(product._id, e)}
        >
          в корзину

        </button>
      </div>
    </div>
  )
}
