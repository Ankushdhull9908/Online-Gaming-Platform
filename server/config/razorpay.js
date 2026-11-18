import Razorpay from "razorpay";
import 'dotenv/config'

const razorpay = new Razorpay({
    key_id: process.env.razorpay_key_id,
    key_secret: process.env.razorpay_key_secret
});

export default razorpay;