import React, { useContext } from 'react'; 
import authcontext from '../context/AuthContext'

function Dashboard() {
  

  const { userData, loading, logout } = useContext(authcontext)

  if (loading) return <h2>Loading Profile...</h2>;
  console.log(userData);
  

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome, {userData?.name}!</h1>
      <p>Email: {userData?.email}</p>
      <button 
        onClick={logout} 
        style={{ backgroundColor: '#ff4d4d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;