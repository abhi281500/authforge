import mongoose from "mongoose";

export const  connectDb = async () =>{
    try {
      const conn = await  mongoose.connect(process.env.MONGODB_URI)
      console.log("Databse connected");
      
    }
     catch (error) {
        console.log("Connection error details : ",error.message);
        process.exit(1);  // server crash ho jayega agar DB connect nahi hua.
        
    }
}