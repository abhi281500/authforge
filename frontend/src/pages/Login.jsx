import {useNavigate} from "react-router-dom"
import React, { useState } from 'react'
import baseURL from '../api/axios.js'

function Login() {
  const [email,setEmail] =useState('')
  const[password,setPassword] =useState('')
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate()
  
  const handleLogin = async() =>{
    setErrorMsg('');
    try {
    const res =  await baseURL.post("/auth/login",{email,password})
      console.log("successful Login : ",res.data);
      localStorage.setItem("token", res.data.accessToken);

      navigate("/dashboard")
      
    } catch (error) {
      console.log("Full Error Object:", error.response);
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message || "Something went wrong");
      } else {
        setErrorMsg("Server issue. Please try again later.");
      }
      
    }
  }
  return (
  <div className="login-container">
    <h2>Welcome Back</h2>

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
      />
    </div>

    <div className='password'>
      <label>Password</label>
      <input
        type='password'
        placeholder='Enter your password'
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button onClick={handleLogin}>Login</button>
  </div>
);



}

export default Login