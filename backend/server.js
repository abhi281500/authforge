import dotenv from "dotenv"

dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import { connectDb } from './config/auth.config.js';
import authRoutes from "../backend/routes/auth.routes.js"


const app = express();

const PORT =process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)

connectDb();

app.listen(PORT, ()=>{
    console.log(`server is listenning at http://localhost:${PORT}`);
    
})