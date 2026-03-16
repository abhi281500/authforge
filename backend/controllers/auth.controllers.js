import { User } from "../models/user.models.js";
export const UserRegister = async (req,res) =>{

     // get user details from frontend 
    // validate the user details
    // check if user already exists - username or email 
    // create user object - create entry in database
    // remove password & refresh token field from the response
    // check for user creation success 
    // return response 
 
    const {name,email,password,isverified} =req.body
    if(!name)
        throw new Error("name is required");
    if(!email)
        throw new Error("email is required");
    if(!password)
        throw new Error("password is required");

     

    const existUser= await User.find({email})

    if(existUser)
        throw new Error("User is already exist")

    const newUser = new User({name,email,password}) 

    

    res
    .status(201)
    .json(newUser)
}


export const UserLogin = async (req,res) =>{

}

export const UserLogout= async (req,res) =>{

}

export const UserForgetPassword = async (req,res) =>{

}

export const UserResetPassword= async (req,res) =>{

}

export const UserProfile = async (req,res) =>{

}

export const UpdateProfile = async (req,res) =>{

}