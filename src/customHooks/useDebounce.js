import { useEffect, useState } from 'react'

export const useDebounce = (value, ms = 300) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value)
    }, ms)

    return () => { clearTimeout(timeoutId) }
  }, [value])
  return debounceValue
}

/*
Идея: вызываем этот хук где-то и передаем ему значение и время.
Если значение продержалось больше, чем указанное время, оно возвращается.
То,что в return'е useEfect'а, сработает либо при размонтировании компонента, либо прям перед новым  запуском useEffect
*/
