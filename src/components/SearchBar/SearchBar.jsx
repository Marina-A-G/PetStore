/* eslint-disable no-unused-vars */
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../../classes/APIclass'
import { useDebounce } from '../../customHooks/useDebounce'
import { productsSet } from '../../ReduxToolkit/slices/productsSlice'
import { filterRemove, searchAdd, sortRemove } from '../../ReduxToolkit/slices/urlSlice'
import searchStyles from './searchBar.module.scss'

export function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [input, setInput] = useState(() => searchParams.get('q') ?? '')
  const debounceValue = useDebounce(input, 500)
  const dispatch = useDispatch()
  const token = useSelector((store) => store.token)
  const navigate = useNavigate()
  const urlParams = useSelector((store) => store.url)

  // eslint-disable-next-line no-unused-vars
  const getSearchedProductsSuccess = (prods, searchString) => {
    dispatch(sortRemove())
    dispatch(filterRemove())
    dispatch(searchAdd(searchString))
    dispatch(productsSet(prods))
  }

  const { mutateAsync: getSearchedProdsHandler } = useMutation({
    mutationFn: (searched) => api.getSearchedProductsRequest(searched, token),
    onSuccess: (response, searched) => { getSearchedProductsSuccess(response, searched) },
    // eslint-disable-next-line max-len
    onError: (errResp) => {
      console.log(`errMessage: ${errResp.message}, errName: ${errResp.name}`)
    },
  })

  /*  useEffect(() => {
    if (urlParams.q) {
      setSearchParams({ q: urlParams.q })
      setInput(urlParams.q)
    }
  }, []) */

  useEffect(() => {
    if (!input) setSearchParams(undefined)
    else setSearchParams({ q: input })
  }, [input])

  useEffect(() => {
    if (debounceValue) getSearchedProdsHandler(debounceValue)
  }, [debounceValue])

  return (
    <div className={searchStyles.container}>
      <form>
        <input
          id="searchBarInput"
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
