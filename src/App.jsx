import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { tokenAuthContext } from './contexts/TokenAuth'
import { useContext } from 'react'

function App() {

  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister />} />
        <Route path='/dashboard' element={isAuthorised ? <Dashboard /> : <Navigate to={'/login'} />} />
        <Route path='/projects' element={isAuthorised ? <Projects /> : <Navigate to={'/login'} />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
