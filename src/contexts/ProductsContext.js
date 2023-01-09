import React, { useContext, useMemo } from 'react'
import { useProducts } from '../customHooks/useProducts'

export const ProductsContext = React.createContext()
export const ProductsHelperContext = React.createContext()

// ниже "хозяйство, которое будет все это оборачивать"
export function ProductsContextProvider({ children }) {
// children - все то, что находится между открывающим и закрывающим тегами компонента
  // const test = 'string'
  // const productsData = useProducts()
  const {
    products,
    setProducts,
    getAllProductsRequest,
  } = useProducts()

  const productsHelperValue = useMemo(() => ({
    setProducts,
    getAllProductsRequest,
  }), [])

  // const productsData = useMemo(() => (productsD), [productsD.products])

  return (
    <ProductsContext.Provider value={products}>
      <ProductsHelperContext.Provider value={productsHelperValue}>
        {children}
      </ProductsHelperContext.Provider>
    </ProductsContext.Provider>
  )
}
// value - те данные, которые хотим положить в контекст, котрые нужно зашарить между другими компонентами
// именно value, никак иначе называть нельзя
// можно положить только одно значение, поэтому если несколько, то {{ }}
// первые {} говорят, что в них будет находиться какое-то js-выражение
// вторые {} обертывают все то, что надо туда положить, в одну сущность

export const useProductsContext = () => useContext(ProductsContext)
export const useProductsHelperContext = () => useContext(ProductsHelperContext)
