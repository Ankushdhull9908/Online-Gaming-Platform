import razorpay from "../config/razorpay.js"
import 'dotenv/config'
import player from "../models/PlayerSchema.js"

const coinpack = [
    {
        id:1,
        coins:500,
        amount:50,
        bonus:0,
        image: "/images/coin-packs/pack-500.png"
    },
    {
        id:2,
        coins:1200,
        amount:99,
        bonus:100,
        image: "/images/coin-packs/pack-1200.png"
    },
    {
        id:3,
        coins:2500,
        amount:200,
        bonus:500,
        image: "/images/coin-packs/pack-2500.png"
    },
    {
        id:4,
        coins:6000,
        amount:400,
        bonus:900,
        image: "/images/coin-packs/pack-6000.png"
    },
    {
        id:5,
        coins:12000,
        amount:800,
        bonus:2000,
        image: "/images/coin-packs/pack-12000.png"
    }
]

export function coinPack(req,res)
{
    console.log('coin packs')
    if(!coinPack.length)
    {
        return res.json({message:'no coinpack data'})
    }

    res.json({success:'coin-apck data',data:coinpack})

}

export async function purchaseCoinPack(req,res)
{
    try {

        console.log('pack id',req.params.packid)

        // Find selected coin pack
        const pack = coinpack.find(
            (i) => i.id === Number(req.params.packid)
        );

        if (!pack) {
            return res.status(404).json({
                success: false,
                message: "Invalid coin pack"
            });
        }

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: pack.amount * 100,
            currency: "INR",
            receipt: `coinpack_${Date.now()}`
        });

        res.json({
    success: true,
    key: process.env.razorpay_key_id,
    order,
    pack
});

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to create order"
        });

    }
}

export async function confirmPayment(req,res)
{
      try{
       // if(req.body.)
       if(!req.body.razorpay_payment_id || !req.body.razorpay_order_id || !req.body.razorpay_signature)
       {
        return res.json({error:"missing details"})
       }
      

       const exist = await player.findOne({_id:req.user.data.id})

       if(!exist)
       {
        return res.json({error:"no such user"})
       }
       const coinpackResult = coinpack.find((i)=> i.id===req.body.id)


       console.log('coin pack results',coinpackResult)

       const data = await player.findByIdAndUpdate(req.user.data.id,{$inc:{coins:coinpackResult.coins}}, { returnDocument: 'after' })

       res.json({success:"Task successfull",playerData:{username:data.playerIngameId,xp:data.xp,playerprofile:data.playerprofile,coins:data.coins}})


      }catch(e)
      {
        console.log(e)
      }


}