import { SearchBar } from '../SearchBar/SearchBar'
import headerStyles from './header.module.scss'
import picLogo from './CatLogo.png'
import picUser from './user01.png'

function Header() {
  console.log('header render')
  return (
    <header className={headerStyles.background}>
      <h1>Это header</h1>
      <SearchBar />
      <img src={picLogo} alt="ЛОГО" className={headerStyles.icon} />
      <a href="/user/"><img src={picUser} alt="Юзверь" className={headerStyles.icon} /></a>

    </header>
  )
}

export {
  Header,
}
