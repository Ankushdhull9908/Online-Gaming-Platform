import express from 'express'
import multer from 'multer';
import { uploadProfile } from '../controllers/imageController.js';
import {VerifyUser} from '../middlewares/authMiddleware.js'

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
});

router.put('/upload',VerifyUser,upload.single('profile'),uploadProfile)


export default router


