import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../../classes/APIclass'
import { useDebounce } from '../../customHooks/useDebounce'
import { productsSetAC } from '../../ReduxClear/actionCreators/productsAC'
import searchStyles from './searchBar.module.scss'

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(() => searchParams.get('q') ?? '')
  const debounceValue = useDebounce(input, 1000)
  const dispatch = useDispatch()
  const token = useSelector((store) => store.token)
  const navigate = useNavigate()

  const getSearchedProductsSuccess = (prods) => {
    dispatch(productsSetAC(prods))
  }

  const { mutateAsync: getSearchedProdsHandler } = useMutation({
    mutationFn: (searched) => api.getSearchedProductsRequest(searched, token),
    onSuccess: (response) => { getSearchedProductsSuccess(response) },
    // eslint-disable-next-line max-len
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })
  useEffect(() => {
    if (!token) {
      alert('Что-то мы Вас не узнаем. Авторизуйтесь, пожалуйста.')
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (!input) setSearchParams(undefined)
    else setSearchParams({ q: input })
  }, [input])

  useEffect(() => {
    console.log(debounceValue)
    getSearchedProdsHandler(debounceValue)
    // navigate('products/')
    console.log('здесь пойдет запросб юзМутэйт и навигация на страницу продуктов')
  }, [debounceValue])

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
