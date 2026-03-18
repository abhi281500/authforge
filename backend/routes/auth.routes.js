import express from 'express'
import { forgotPassword, getUserProfile, resetPassword, updateUserProfile, UserLogin, UserLogout, UserRegister } from '../controllers/auth.controllers.js'
import { verifyJWT } from '../middleware/auth.middleware.js' 

const router = express.Router()

router.post("/register", UserRegister)
router.post("/login", UserLogin)


router.post('/logout', verifyJWT, UserLogout)
router.get('/profile', verifyJWT, getUserProfile)
router.post('/update-profile', verifyJWT, updateUserProfile)


router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword) 

export default router