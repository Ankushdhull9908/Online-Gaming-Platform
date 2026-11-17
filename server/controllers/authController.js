import player from "../models/PlayerSchema.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt, { hash } from 'bcrypt'


export async function signup(req,res)
{
    console.log(req.body)

    try{
        const user = await player.findOne({email:req.body.email})
        if(user)
        {
            return res.json({message:"User already Exist"})
        }

        const hashpass = await bcrypt.hash(req.body.password,10)
        await player.create({
            playerIngameId:req.body.username,
            email:req.body.email,
            password:hashpass,
            playerprofile:req.body.playerprofile,
            xp:req.body.xp
        })
        return res.status(201).json({
            success: "User registered successfully"
        });

    }catch(e)
    {
        console.log(e)
        res.json({message:"Internal Server Error"})
    }
}

export async function login(req,res)
{

    try{
        const user = await player.findOne({email:req.body.email})
        if(!user)
        {
            return res.json({message:'no such user..signup'})
        }
        const encrpytedPass = user.password
        const decode= await bcrypt.compare(req.body.password,encrpytedPass)

        if(!decode)
        {
            return res.json({message:"invalid password"})
        }

        const token = jwt.sign({
            data:{
                id:user._id,
                username:user.playerIngameId,
                xp:user.xp,
                playerprofile:user.playerprofile

            }
        },process.env.JWT_SECRET)

        res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000
})

        res.json({success:"Login successfull",playerData:{username:user.playerIngameId,xp:user.xp,playerprofile:user.playerprofile}})

    }catch(e)
    {
       console.log(e)
    }
}

export async function checkAuth(req,res)
{
    
    const user = await player.findOne({_id:req.user.data.id})

    //console.log(user)
    
    res.json({success:"login successfull",playerData:{username:user.playerIngameId,xp:user.xp,playerprofile:user.playerprofile}})
}
export function logout(req,res)
{
    res.clearCookie('token')
    
    res.json({success:"logout successfull"})
}