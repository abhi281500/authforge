import { useNavigate } from "react-router-dom"
import React, { useContext, useState } from 'react'

import authcontext from "../context/AuthContext.jsx"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate()
  const {login} = useContext(authcontext)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg(''); // Purana error saaf karein
    try {
        
      await login(email, password); 
        
    } catch (error) {
        
        const msg = error.response?.data?.message || "Invalid credentials";
        setErrorMsg(msg);
    }
};
  
  return (
   <form onSubmit={handleSubmit} className="login-container">
  <h2>Log in to your account</h2>

  {errorMsg && (
    <div style={{ color: 'white', backgroundColor: '#ff4d4d', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
      {errorMsg}
    </div>
  )}

  <div className='email'>
    <label>Email Address</label>
    <input
      type='email'
      placeholder='Enter your email'
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div className='password'>
    <label>Password</label>

    <span
      onClick={() => navigate('/forgotpassword')}
      style={{ cursor: 'pointer', color: 'blue' }}
    >
      Forgot password?
    </span>

    <input
      type='password'
      placeholder='Enter your password'
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>

  <button type="submit">Login</button>

  <p>
    Don't have an account?
    <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: 'blue' }}>
      Sign Up
    </span>
  </p>
</form>
  );



}

export default Login