import { useState } from "react";
import authcontext from "./AuthContext.jsx";
import { useEffect } from "react";


import baseUrl from "../api/axios.js"
import { useNavigate } from "react-router-dom";


export const AuthProvider = ({ children }) => {
    // 1. Yahan states banaiye (user, loading)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    

    const register = async (name, email, password) => {
        try {
            setLoading(true)
            await baseUrl.post('/auth/register', { name, email, password })
            navigate("/login")
        }
        catch (error) {
            console.error("Registration failed in Context:", error);
            throw error;
        }


    }



    const fetchProfile = async () => {
        setLoading(true);
    try {
        const token = localStorage.getItem("accessToken");
        
        if (!token) {
            
            setLoading(false);
            return; 
        }

        // Backend ko batana padega: "Ye lo meri chabi (Token)"
        const res = await baseUrl.get('/auth/profile', {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        // Aapke backend se data 'res.data.user' mein aa raha hai
        setUserData(res.data.user); 
        setLoading(false);

    } catch (error) {
        console.error("profile error :", error);
        // Agar token invalid hai, toh user ko logout kar dena chahiye
        setUserData(null);
        setLoading(false);
    }
};




    const login = async (email, password) => {
        try {
            const res = await baseUrl.post('/auth/login', { email, password })
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            navigate('/dashboard')
            return res.data

        } catch (error) {
            console.error("Login failed in context", error);
            throw error

        }

    }




    const logout = async () => {
    try {
        // 1. LocalStorage se token nikaalo taaki backend ko bhej sakein
        const refreshToken = localStorage.getItem("refreshToken");

        // 2. Backend ko refreshToken bhejo (kyunki aapka backend req.body se maang raha hai)
        const res = await baseUrl.post('/auth/logout', { refreshToken });

        // 3. Browser ki memory (LocalStorage) poori saaf kar do
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // 4. Context ki state ko wapas khali kar do
        setUserData(null);

        // 5. Navigate to login
        navigate('/login');

        return res.data;
    } catch (error) {
        console.error("logout error : ", error);
        
        // Agar backend fail bhi ho jaye, tab bhi frontend se data saaf kar dena chahiye (Force Logout)
        localStorage.clear();
        setUserData(null);
        navigate('/login');
    }
};



    const forgotPassword = async (email) => {
    try {
        const res = await baseUrl.post('/auth/forgot-password', { email });
        return res.data; 
    } catch (error) {
        console.error("forgot password error :",error);
        
        throw error;
    }
};




    const resetPassword = async (token, password) => {
    try {
       
        const res = await baseUrl.post(`/auth/reset-password/${token}`, { password });
        return res.data;
    } catch (error) {
        console.error("resetpassword error :",error);
        
        throw error;
    }
};



   const updateProfile = async (updatedData) => {
    try {
        const token = localStorage.getItem("accessToken");
        const res = await baseUrl.put('/auth/update-profile', updatedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        // Update hone ke baad Context state ko bhi refresh karein
        setUserData(res.data.user); 
        return res.data;
    } catch (error) {
        console.error("updateprofile error ",error);
        
        throw error;
    }
};


useEffect(() => {
        fetchProfile();
    }, []);



    return (
        <authcontext.Provider value={{ userData, loading, register, fetchProfile, login, logout, forgotPassword, resetPassword, updateProfile }}>
            {children}
        </authcontext.Provider>
    );
};