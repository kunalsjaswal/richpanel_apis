import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    subscription:{
        type:Number,
        default:-1
    }
})

const userRegData  = mongoose.model('newUser', userSchema)
export default userRegData