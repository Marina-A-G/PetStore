import { useState } from 'react'
import searchStyles from './searchBar.module.scss'

export function SearchBar() {
  const [input, setInput] = useState('')
  // console.log({ input })

  return (
    <div className={searchStyles.container}>
      <div>Это окошко поиска</div>
      <form>
        <input
          type="text"
          className={searchStyles.input}
          placeholder="Поиск >>>"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </form>
    </div>

  )
}
