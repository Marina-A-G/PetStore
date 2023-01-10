import './App.css'
import { Outlet } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { UserContextProvider } from './contexts/UserContext'

function App() {
  return (
    <UserContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </UserContextProvider>
  )
}

export default App
