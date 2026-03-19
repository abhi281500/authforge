import React, { useState } from 'react'
import baseUrl from "../api/axios.js"
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name,setName] =useState('')
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [errorMsg, setErrorMsg] = useState('');

  const navigate =useNavigate()
  const isFormValid = name && email && password;

  const handleRegister = async ()=>{
    setErrorMsg('');
    try {
         await baseUrl.post('/auth/register',{name,email,password})
        
        navigate('/login')

    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data || "Something went wrong");
      } else {
        setErrorMsg("Server issue. Please try again later.");
      }
      
    }
  }

 return (
  <div className="Register-container">
    <h2>Create Account</h2>

    {errorMsg && (
        <div style={{ color: 'white', backgroundColor: '#ff4d4d', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {errorMsg}
        </div>
      )}

  <div className='name'>
      <label>Full Name</label>
      <input
        type='text'
        placeholder='Enter your name'
        onChange={(e) => setName(e.target.value)}
      />
    </div>


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

    <button 
        onClick={handleRegister} 
        disabled={!isFormValid}
        style={{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed' }}
      >
        Register
      </button>

    <p>
        Already have an account? 
        <span onClick={() => navigate('/login')} style={{cursor: 'pointer', color: 'blue'}}> Login here</span>
      </p>
  </div>
);
}

export default Register