/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
  const cart = useSelector((store) => store.cart)
  const isInCart = cart.find((item) => item.id === product._id)
  let isFav
  if (favourites.indexOf(product._id) === -1) {
    isFav = false
  } else isFav = true

  const changeFavStatusHandler = () => {
    // console.log('жмак!', product._id, isFav)
    if (isFav) {
      dispatch(favouritesRemoveProduct(product._id))
    } else {
      dispatch(favouritesAddProduct(product._id))
    }
    isFav = !isFav
  }

  const addToCartHandler = (productId, e) => {
    // eslint-disable-next-line max-len
    /* if ((e.target.parentNode.children.quantity.value) > 0) {
      const quantity = Number(e.target.parentNode.children.quantity.value) <= product.stock
        ? Number(e.target.parentNode.children.quantity.value)
        : product.stock */
    if (!isInCart) { dispatch(cartAddProduct(product._id, 1)) }
    // }
  }

  const priceInitial = product.discount === 0 ? '' : product.price
  const priceFinal = Math.round(product.price * (1 - product.discount / 100))

  return (
    <div className={cardStyles.cardContainer}>

      <Link to={`/products/${product._id}`}>
        <img src={product.pictures} alt={product.name} className={cardStyles.cardPicture} />
      </Link>
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
      <Link to={`/products/${product._id}`}>
        <div className={cardStyles.cardName}>
          {product.name}
        </div>
        <div className={cardStyles.cardName}>
          {`В наличии: ${product.stock}`}
        </div>
      </Link>

      <div className={cardStyles.cardCartElementsContainer}>

        <button
          type="button"
          className={`${cardStyles.cardCartButton} ${isInCart && cardStyles.cardCartButtonIn}`}
          onClick={(e) => addToCartHandler(product._id, e)}
        >
          {`${isInCart ? 'уже в корзине' : 'в корзину'}`}
        </button>
      </div>
    </div>
  )
}

/*
        <input
          name="quantity"
          type="number"
          min="0"
          max={product.stock}
          className={cardStyles.cardCartInput}
          placeholder="0"
        />
        */
