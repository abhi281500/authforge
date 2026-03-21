import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"

import authcontext from '../context/AuthContext'

function ForgotPassWord() {
    const [email, setEmail] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate()

    const {forgotPassword} = useContext(authcontext)

    const handleclick = async () => {
        setErrorMsg('');
        try {
            await forgotPassword(email)
            setSuccessMsg("Reset link has been sent to your email address!");
            
            
           
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMsg(error.response.data.message || "Something went wrong");
            } else {
                setErrorMsg("Server issue. Please try again later.");
            }
        }
    }

    return (
       
        <div className="login-container">
            <h3>Forget your password?</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                A link or code will be sent to your email to help reset your password.
            </p>

           
            {errorMsg && (
                <div style={{ color: 'white', backgroundColor: '#ff4d4d', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                    {errorMsg}
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
                />
            </div>

            <button onClick={handleclick}>
                Send Reset Link
            </button>

            <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
                Remembered? <span onClick={() => navigate('/login')} style={{ color: '#2563eb', cursor: 'pointer' }}>Back to Login</span>
            </p>
        </div>
    )
}

export default ForgotPassWord