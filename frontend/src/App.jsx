
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Login/>}/>
        <Route path='/dashboard' element ={<Dashboard/>}/>
        <Route path ='/register' element={<Register/>} />
        <Route path ='/login' element={<Login/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
