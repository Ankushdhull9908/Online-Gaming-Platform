import express from 'express'
import { checkAuth, login, logout, signup } from '../controllers/authController.js'
import {VerifyUser} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.get('/me',VerifyUser,checkAuth)
router.post('/logout',logout)
export default router