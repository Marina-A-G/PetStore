import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SearchBar } from '../SearchBar/SearchBar'
import headerStyles from './header.module.scss'
import picCart from './CatLogo2.png'
import picFav from './fav.png'
import picUser from './user02.png'
import picExit from './exit02.png'
import { TokenLSkey } from '../../utils/constants'
import { cartClear } from '../../ReduxToolkit/slices/cartSlice'
import { tokenDelete } from '../../ReduxToolkit/slices/tokenSlice'

function Header() {
  // console.log('header render')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartQuantity = useSelector((store) => store.cart).length
  const favQuantity = useSelector((store) => store.favourites).length
  console.log('favQuant ', favQuantity)

  const catalogClickHandler = () => {
    navigate('products/')
  }
  const exitClickHandler = () => {
    dispatch(cartClear())
    dispatch(tokenDelete())
    navigate('/')
  }

  const cartClickHandler = () => {
    navigate('cart/')
  }

  const favouritesClickHandler = () => {
    navigate('favourites/')
  }

  const userClickHandler = () => {
    const tokenObjFromLS = localStorage.getItem(TokenLSkey)
    if (tokenObjFromLS) {
      const tokenObj = JSON.parse(tokenObjFromLS)
      if (tokenObj.token) {
        navigate('user/')
      } else {
        alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
        navigate('/')
      }
    } else {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }

  return (
    <header className={headerStyles.background}>
      <h1>Хрум-чавк!</h1>
      <SearchBar />
      <button
        type="button"
        className={headerStyles.button}
        title="Ну вот, на кнопке же написано"
        onClick={catalogClickHandler}
      >
        Ката лог
      </button>
      <div className={headerStyles.forCart}>
        <button
          type="button"
          className={headerStyles.button}
          title="Корзина"
          onClick={cartClickHandler}
        >
          <img src={picCart} alt="Корзина" className={headerStyles.icon} />
        </button>
        {cartQuantity > 0
        && (<div className={headerStyles.cartQuantity}>{cartQuantity}</div>)}
      </div>

      <div className={headerStyles.forCart}>
        <button
          type="button"
          className={headerStyles.button}
          title="Избранное"
          onClick={favouritesClickHandler}
        >
          <img src={picFav} alt="Изб" className={headerStyles.icon} />
        </button>
        {favQuantity > 0
        && (<div className={headerStyles.cartQuantity}>{favQuantity}</div>)}

      </div>

      <button
        type="button"
        className={headerStyles.button}
        title="Пользователь"
        onClick={userClickHandler}
      >
        <img src={picUser} alt="Юзверь" className={headerStyles.icon} />
      </button>
      <button
        type="button"
        className={headerStyles.button}
        title="Выход. Но приходите ещё!"
        onClick={exitClickHandler}
        style={{ backgroundImage: './exit02.png' }}
      >
        <img src={picExit} alt="Выход" className={headerStyles.icon} />
      </button>
    </header>
  )
}

export {
  Header,
}
