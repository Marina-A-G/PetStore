import { useNavigate } from 'react-router-dom'
import { SearchBar } from '../SearchBar/SearchBar'
import headerStyles from './header.module.scss'
import picCart from './CatLogo.png'
import picUser from './user02.png'
import picExit from './exit02.png'
import { TokenLSkey } from '../../utils/constants'

function Header() {
  console.log('header render')
  const navigate = useNavigate()

  const exitClickHandler = () => {
    localStorage.setItem(TokenLSkey, '')
    navigate('/')
  }

  const cartClickHandler = () => {
    alert('Здесь будет открываться корзина... Ну, когда-нибудь...')
  }

  const userClickHandler = () => {
    const tokenObjFromLS = localStorage.getItem(TokenLSkey)
    if (tokenObjFromLS) {
      const tokenObj = JSON.parse(tokenObjFromLS)
      console.log(`token=${tokenObj.token}`)
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
      <h1>Это header</h1>
      <SearchBar />
      <button type="button" className={headerStyles.button} onClick={cartClickHandler}>
        <img src={picCart} alt="Корзина" className={headerStyles.icon} />
      </button>
      <button type="button" className={headerStyles.button} onClick={userClickHandler}>
        <img src={picUser} alt="Юзверь" className={headerStyles.icon} />
      </button>
      <button type="button" className={headerStyles.button} onClick={exitClickHandler}>
        <img src={picExit} alt="Выход" className={headerStyles.icon} />
      </button>

    </header>
  )
}

export {
  Header,
}
