import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    orderType: {
        type: String,
        enum: ['coinpack', 'subscription'],
        required: true
    },

    packid: {
        type: Number
    },

    amount: {
        type: Number,
        required: true
    },

    coins: {
        type: Number
    },

    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    },

    razorpayPaymentId: {
        type: String,
        default: null
    },

    status: {
        type: String,
        enum: ['paid', 'pending', 'failed'],
        default: 'pending'
    }

}, { timestamps: true });

export const payment = mongoose.model('Payment', PaymentSchema);