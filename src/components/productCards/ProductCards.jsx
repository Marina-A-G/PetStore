/* eslint-disable no-underscore-dangle */
import React from 'react'
import cardStyles from './productCards.module.scss'
import { ProductCard } from './productCard'

export const ProductCards = React.memo(({ products }) => {
  // if (typeof products === 'undefined') return <div>Products list is empty</div>
  if (!products.length) return <div>А воть не найдено ничего...</div>

  return (
    <div className={cardStyles.CardsBlockContainer}>
      {products.map((product) => <ProductCard key={product._id} product={product} />)}
    </div>
  )
})

/*
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
) */
