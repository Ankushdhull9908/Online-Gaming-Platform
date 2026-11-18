import express from 'express'
import cors from 'cors'
import { mongodb } from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import { initSocket } from "./socket/socket.js";
import imageRoutes from './routes/imageRoute.js'
import http from "http";
import coinpackRoutes from './routes/coinpackRoutes.js'
mongodb()

const app = express()

app.use(cors({
    origin:['http://localhost:5173','https://client-ten-gray-68.vercel.app'],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/image',imageRoutes)
app.use('/api/shop',coinpackRoutes)


const server = http.createServer(app);
initSocket(server);
server.listen(5000,()=> console.log('server running on http://localhost:5000'))
