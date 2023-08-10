import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    status:{
        type:Boolean,
        default:false
    },
    date:String,
    price:Number,
    type:String,
    time:String,
    plan:Number
})

const userRegData  = mongoose.model('newUser', userSchema)
export default userRegData