import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams add kiya

import authcontext from '../context/AuthContext.jsx';

function ResetPassword() {
    const { token } = useParams(); // URL se asli token nikaalta hai
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    const {resetPassword }=useContext(authcontext)


    const handleReset = async () => {
        if (!token) {
        return setErrorMsg("Invalid or expired reset link.");
    }

        if (password !== confirmPassword) {
  return setErrorMsg("Passwords do not match");
}
        try {
            await resetPassword(token, password);
            setSuccessMsg("Password updated! Redirecting to login...");
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div className="login-container">
            <h2>Reset Password</h2>
            
            {errorMsg && <div className="error-bar" style={{backgroundColor: '#ff4d4d', color: 'white', padding: '10px'}}>{errorMsg}</div>}
            {successMsg && <div className="success-bar" style={{backgroundColor: '#4caf50', color: 'white', padding: '10px'}}>{successMsg}</div>}

            <div className='password'>
                <label>NEW PASSWORD</label>
                <input
                    type='password'
                    value={password}
                    placeholder='Enter new password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className='password'>
                <label>CONFIRM NEW PASSWORD</label>
                <input
                    type='password'
                    value={confirmPassword}
                    placeholder='Re-type password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button onClick={handleReset}>Update Password</button>
        </div>
    );
}

export default ResetPassword;