import cartStyles from './cart.module.scss'

export function CartItem() {
  // сюда передать id
  // сделать запрос на один товар
  // вывести название, цену со скидкой, сток
  // вывести из стейта количество  в корзине, сделать проверку на stock
  // все эти данные запихнуть в стейт вместе со статусом (чекбоксом)
  return (
    <div className={cartStyles.cartItemContainer}>
      <div className={cartStyles.cartItemPicture}>
        Картинка

      </div>
      <div className={cartStyles.cartItemName}>Название</div>
      <div className={cartStyles.cartItemQuantityBlock}>Количество</div>
      <div className={cartStyles.cartItemTotal}>Стоимость</div>
    </div>

  )
}
