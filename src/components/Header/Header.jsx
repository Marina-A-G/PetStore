import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SearchBar } from '../SearchBar/SearchBar'
import headerStyles from './header.module.scss'
import picCart from './CatLogo2.png'
import picUser from './user02.png'
import picExit from './exit02.png'
import { TokenLSkey } from '../../utils/constants'
import { tokenDeleteAC } from '../../ReduxClear/actionCreators/tokenAC'

function Header() {
  // console.log('header render')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartQuantity = useSelector((store) => store.cart).length

  const catalogClickHandler = () => {
    navigate('products/')
  }
  const exitClickHandler = () => {
    dispatch(tokenDeleteAC())
    navigate('/')
  }

  const cartClickHandler = () => {
    navigate('cart/')
    // alert('Здесь будет открываться корзина... Ну, когда-нибудь...')
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
