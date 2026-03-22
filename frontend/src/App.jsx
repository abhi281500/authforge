import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassWord'
import ResetPassword from './pages/ResetPassword'
import { AuthProvider } from './context/AuthProvider'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    
    <BrowserRouter>
      
      <AuthProvider> 
        <div>
          <Navbar />
          <Routes>   
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

          <Route path='/dashboard' element={
           <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
            } />

            
            <Route path='/forgotpassword' element={
             <ForgotPassword/>
             } 
              />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App