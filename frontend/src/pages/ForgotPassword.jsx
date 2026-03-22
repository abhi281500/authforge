import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import authcontext from '../context/AuthContext'

function ForgotPassWord() {
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { forgotPassword } = useContext(authcontext)

  const handleclick = async () => {
    setErrorMsg('')
    setSuccessMsg('')

    try {
      setLoading(true)
      await forgotPassword(email)
      setSuccessMsg("Reset link has been sent to your email address!")
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="login-container"
      onSubmit={(e) => {
        e.preventDefault()
        handleclick()
      }}
    >
      <h3>Forget your password?</h3>

      <p style={{ color: '#666', marginBottom: '20px' }}>
        A link or code will be sent to your email to help reset your password.
      </p>

      {errorMsg && (
        <div style={{
          color: 'white',
          backgroundColor: '#ff4d4d',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div style={{
          color: 'white',
          backgroundColor: '#4caf50',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px'
        }}>
          {successMsg}
        </div>
      )}

      <div className='email'>
        <label>Email Address</label>
        <input
          type='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
        Remembered?
        <span
          onClick={() => navigate('/login')}
          style={{ color: '#2563eb', cursor: 'pointer' }}
        >
          {' '}Back to Login
        </span>
      </p>
    </form>
  )
}

export default ForgotPassWord