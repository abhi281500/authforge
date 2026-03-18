import mongoose from "mongoose"

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    refreshToken: {
        type: String
    },

}, { timestamps: true })

export const User = mongoose.model("User", userschema)