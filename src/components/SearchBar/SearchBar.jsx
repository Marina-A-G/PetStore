import { useState } from 'react'
import searchStyles from './searchBar.module.scss'

export function SearchBar() {
  const [input, setInput] = useState('')
  // console.log({ input })

  return (
    <div className={searchStyles.container}>
      <form>
        <input
          type="text"
          className={searchStyles.input}
          placeholder="Что-то ищете?"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </form>
    </div>

  )
}
