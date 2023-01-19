/* eslint-disable no-underscore-dangle */
import cardStyles from './productCards.module.scss'

export function ProductCard({ product }) {
  return (
    <div className={cardStyles.cardContainer}>

      <img src={product.pictures} alt={product.name} className={cardStyles.cardPicture} />

      <div className={cardStyles.cardPrice}>
        {`${product.price} р.`}
      </div>
      <div className={cardStyles.cardName}>
        {product.name}
      </div>
    </div>
  )
}
