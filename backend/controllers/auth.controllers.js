import { User } from "../models/user.models.js";
import bcrypt, { hash } from 'bcrypt'
import jwt from "jsonwebtoken"
import crypto from 'crypto'
export const UserRegister = async (req, res) => {

    // get user details from frontend 
    // validate the user details
    // check if user already exists - username or email 
    // create user object - create entry in database
    // remove password & refresh token field from the response
    // check for user creation success 
    // return response 

    try {
        const { name, email, password, isverified } = req.body
        if (!name)
             return res.status(400).json({message :"name is required"})
        if (!email)
             return res.status(400).json({message :"Email is required"})
        if (!password)
             return res.status(400).json({message :"password is required"})



        const existUser = await User.findOne({ email })

        if (existUser)
             return res.status(400).json({message :"User with this email already exist "})

        const saltRounds = 10

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User(
            {
                name,
                email,
                password: hashedPassword
            }
        )
        await newUser.save()
        const createdUser = await User.findById(newUser._id).select("-password");
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong while registering" });
        }

        


        res
            .status(201)
            .json({
                message: "User registered successfully"
            })

    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }

}


export const UserLogin = async (req, res) => {

    // get user login details from frontend (email, password)
    // validate the input fields
    // check if email and password are provided
    // find user in database using email
    // if user not found → return error (user does not exist)
    // check if user email is verified or not (optional but good practice)
    // compare entered password with hashed password using bcrypt.compare()
    // if password not match → return invalid credentials error
    // generate JWT access token
    // optionally generate refresh token
    // remove password from response object
    // send response with token and user data

    try {
        const { email, password } = req.body

        if (!email)
            return res.status(400).json({message :"Email is required"})

        if (!password)
            return res.status(400).json({message :"password is required"})

        const existUser = await User.findOne({ email })

        if (!existUser)
            return res.status(400).json({message :"Account not found. Don't have an account? "})


        const isMatch = await bcrypt.compare(password, existUser.password)

        if (!isMatch)
            return res.status(400).json({message :"Incorrect Password"})



        const accessToken = jwt.sign(
            { userId: existUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        )
        const refreshToken = jwt.sign(
            { userId: existUser._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "5d" }
        )
        existUser.refreshToken = refreshToken
        await existUser.save()


        res.status(200).json({
            message: "Login successful",
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
                id: existUser._id,
                email: existUser.email,
                name: existUser.name
            }
        })

    } catch (error) {
        return res.status(400).json({ message: error.message });

    }







}

export const UserLogout = async (req, res) => {
    // get user token from request (Authorization header or cookie)
    // verify if token exists
    // if token not present → return error (user not authenticated)
    // optionally blacklist the token (advanced production approach)
    // if using refresh tokens → remove refresh token from database
    // clear authentication cookie if cookies are used
    // send logout success response to client

    try {
        const { refreshToken } = req.body

        if (!refreshToken)
            return res.status(400).json({message :"RefreshToken is required"})

        const user = await User.findOne({ refreshToken })

        if (!user)
            return res.status(401).json({message :"Invalid refresh token"})


        user.refreshToken = null
        await user.save()

        res.status(200)
            .json({
                message: "Logout Successful"
            })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }


}
export const forgotPassword = async (req, res) => {
    // get email from request body
    // validate email field
    // check if user exists in database using email
    // if user not found → return error
    // generate a random reset token
    // hash the reset token before saving to database (security reason)
    // save reset token and expiry time in user document
    // create password reset URL containing the token
    // send reset link to user's email using email service
    // return response → reset email sent successfully

    try {
        const { email } = req.body
        if (!email)
            return res.status(400).json({message :"Email is required"})


        const user = await User.findOne({ email })

        if (!user)
            return res.status(400).json({message :"User not Found"})

        const resetToken = crypto.randomBytes(20).toString('hex');

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const tokenExpiry = Date.now() + 15 * 60 * 1000;


        user.forgotPasswordToken = hashedToken;
        user.forgotPasswordExpiry = tokenExpiry;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        console.log("Reset Link:", resetUrl);

        res
            .status(200)
            .json(
                {
                    message: "reset email sent successfully",
                }
            )
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }



}

export const resetPassword = async (req, res) => {
    // get reset token from request (query params or URL params)
    // get new password from request body
    // validate new password
    // hash the token received from user (because database token is hashed)
    // find user in database using resetPasswordToken
    // check if token exists and is not expired
    // if token invalid or expired → return error
    // hash the new password using bcrypt
    // update user password in database
    // remove resetPasswordToken and resetPasswordExpire fields
    // save updated user
    // return success response (password reset successful)
    try {
        const { token } = req.params
        const { password } = req.body
        if (!password)
            return res.status(400).json({message :"New Password is required"})

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        })

        if (!user)
            return res.status(400).json({message : "Invalid token or expired token"})

        user.password = await bcrypt.hash(password, 10)

        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined

        await user.save()

        res.status(200).json({ message: "Password reset successfully" })

    }

    catch (error) {
        return res.status(500).json({ message: error.message })

    }

}

export const getUserProfile = async (req, res) => {
    // get user id from authenticated request (decoded JWT token)
    // find user in database using user id
    // if user not found → return error
    // remove sensitive fields like password from response
    // send user profile data in response

    try {
        const userId = req.user?._id;

        const user = await User.findById(userId).select("-password -refreshToken");
        if (!user)
            return res.status(404).json({ message: "user not found" })


        res.status(200).json({
            message: "Profile Data",
            user: user
        })

    }

    catch (error) {
        return res.status(500).json({ message: error.message })

    }

}

export const updateUserProfile = async (req, res) => {
    // get user id from authenticated request (req.user.id from JWT middleware)
    // get updated fields from request body
    // example: name, email, password (optional)
    // find user in database using user id
    // if user not found → return error
    // if email is being updated → check if new email already exists in database
    // update allowed fields only (name/email etc)
    // if password is being updated → hash new password using bcrypt
    // save updated user document
    // remove sensitive fields like password before sending response
    // return updated profile data in response
    try {
        const userId = req.user?._id
        const { name, email, password, isverified } = req.body

        const user = await User.findById(userId )

        if (!user)
            return res.status(404).json({ message: "User not Found" })

        if (email && email !== user.email) {
            const existemail = await User.findOne({ email })

            if (existemail)
                return res.status(400).json({ message: "Email already in use by another account" });
            user.email =email
        }

        if(name )
            user.name =name

        if(password){
            user.password = await bcrypt.hash(password,10)
        }

       const updateUser = await user.save()

       const responseUser = updateUser.toObject();
        delete responseUser.password;
        delete responseUser.refreshToken;


        return res.status(200).json({
            message: "Profile updated successfully",
            user: responseUser
        });


    }

    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

