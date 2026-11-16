import 'dotenv/config'
import jwt from 'jsonwebtoken'

export async function VerifyUser(req,res,next)
{
   const token = req.cookies.token
   if(!token)
   {
    return res.json({message:"No token"})
   }

   const ValidToken = await jwt.verify(token,process.env.JWT_SECRET)
   if(!ValidToken)
   {
    return res.json({message:"inalid token"})
   }

   req.user = ValidToken
   next()
}