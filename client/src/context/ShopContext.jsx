import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";


const shopContext = createContext()
const API = window.location.hostname === "localhost"
  ? 'http://localhost:5000/api'
  : '/api'



export function ShopProvider({children})
{
    const [coinpack,setcoinpack]=useState([])
    const {setUser} = useAuth()
    


    useEffect(()=>{

        async function fetchData(){
        try{

            const res = await fetch(`${API}/shop/coin-packs`,{
                credentials:'include'
            })

            if(res)
            {
                const data = await res.json()
                setcoinpack(data.data) 
            }
        }catch(e)
        {
            console.log(e)
        }
    }
    fetchData()
    },[])

    async function purchasepack(packid)
    {
        try{
            const res = await fetch(`${API}/shop/purchase-pack/${packid}`,{
                credentials:'include'
            })
            if(res)
            {
                const data = await res.json()
                console.log('data',data)

                const options = {
            key: data.key,

            amount: data.order.amount,
            currency: data.order.currency,

            name: "Gaming Store",
            description: `${data.pack.coins} Gold Coins`,

            order_id: data.order.id,

            handler: function (paymentResponse) {

                console.log("Payment successful!");
                if(paymentResponse) confirmPayment({...paymentResponse,id:packid})
            },

            theme: {
                color: "#6F3DE7"
            }
        };

        // 3. Open Razorpay checkout
        const razorpay = new window.Razorpay(options);

        razorpay.open();
            }

             

        }catch(e)
        {
            console.log('error',e)
        }
    }

    async function confirmPayment(razorpayData)
    {
        console.log('razor data',razorpayData)
       try{
            const res = await fetch(`${API}/shop/confirm-payment`,{
                method:"POST",
                credentials:"include",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(razorpayData)
            })

            if(res)
            {
                const data = await res.json()
                console.log('data',data)
                setUser(data.playerData)

            }

        }catch(e)
        {
            console.log(e)
        }

    }



    return(
        <shopContext.Provider value={{coinpack,purchasepack}}>
            {children}
        </shopContext.Provider>
    )
}

export function useShop()
{
    return useContext(shopContext)
}