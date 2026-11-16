import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
    playerIngameId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    playerprofile:{
        type:String,
    },
    xp:{
        type:Number
    }
})

const player = mongoose.model('player',playerSchema)
export default player