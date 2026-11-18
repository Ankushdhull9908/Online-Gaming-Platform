import express from 'express'
import {coinPack, confirmPayment, purchaseCoinPack} from '../controllers/coinpackController.js'
import {VerifyUser} from '../middlewares/authMiddleware.js'
const router = express.Router()



router.get('/coin-packs',VerifyUser,coinPack)
router.get('/purchase-pack/:packid',VerifyUser,purchaseCoinPack)
router.post('/confirm-payment',VerifyUser,confirmPayment)


export default router