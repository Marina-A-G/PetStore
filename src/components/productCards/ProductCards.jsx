/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useProductsContext } from '../../contexts/ProductsContext'
import cardStyles from '../Products/products.module.scss'

export const ProductCards = React.memo(() => {
  const products = useProductsContext()

  console.log('ProductCard render')
  // console.log('Products from ProductCard: ')
  // console.log(products)

  if (typeof products === 'undefined') return <div>Products list is empty</div>
  if (!products.length) return <div>Products list is empty</div>

  return (
    <div className={cardStyles.CardsBlockContainer}>
      {products.map((product) => (
        <div key={product._id} className={cardStyles.cardContainer}>
          {product._id}
          <div>
            <img src={product.pictures} alt={product.name} className={cardStyles.cardPicture} />
          </div>
          <div className={cardStyles.cardPrice}>
            {`${product.price} р.`}
          </div>
          <div className={cardStyles.cardName}>
            {product.name}
          </div>
        </div>
      ))}
    </div>
  )
})

/*
ProductCards = React.memo(ProductCards)
export {
  ProductCards,
}
// export default React.memo(ProductCards)
 */
