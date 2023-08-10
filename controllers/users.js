import 'dotenv/config'
import userRegData from "../model/userSchema.js";
import bcrypt from 'bcrypt'
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY)



export const addNewUser=async(req,res)=>{
    try {
        const {username,email,password} = req.body;

        let alreadyOne = await userRegData.findOne({email:email})
        if(alreadyOne){
            return res.status(400).json({status:false, error:"User already exist!"});
        }

        // making salt to hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);

        const new_user = await userRegData.create({
            username:username,
            email:email,
            password:hashPass
        })

        res.status(200).json({status:true})
        
    } catch (error) {
        res.status(500).json({status:false,error: error.message})
    }
}

export const userLogin = async(req,res)=>{
    const {email,password} = req.body;

    try {
        let findUser = await userRegData.findOne({email:email})
        if(!findUser){
            return res.status(400).json({status:false, error:"Incorrect Credentials!"})
        }

        const passCompare = await bcrypt.compare(password, findUser.password)
        if(!passCompare){
            return res.status(400).json({status:false, error:"Incorrect Credentials!"})
        }
        res.status(200).json({ status:true, token:{id:findUser.id, subscription:findUser.subscription}})
    } catch (error) {
        res.status(400).json({status:false, error:error.message})
    }
}

export const userPayment = async(req,res)=>{
    const {id, product} = req.body;

    try { 
        const payment = await stripe.paymentIntents.create({
            amount: product.price,
            currency:"USD",
            payment_method:id, 
            confirm: true
        })

        res.json({status:true,payment:payment})
    } catch (error) {
        res.json({status:false, message: error.message})
    }
}

export const setActive = async(req,res)=>{
    try {
        let user = await userRegData.findById(req.params.id)
        if(!user){
            return res.status(400).json({status:false, error:"some Error"})
        }

        user = await userRegData.findByIdAndUpdate(req.params.id,{subscription:req.body.plan}, {new:true})

      res.status(201).json({status:true})
        
    } catch (error) {
      res.status(404).json({status:false, error:error.message})
    }
}

export const cancelSubscription = async(req,res)=>{
    try {
        let user = await userRegData.findById(req.params.id)
        if(!user){
            return res.status(400).json({status:false, error:"some Error"})
        }

        user = await userRegData.findByIdAndUpdate(req.params.id,{subscription:-1}, {new:true})

      res.status(201).json({status:true})
        
    } catch (error) {
      res.status(404).json({status:false, error:error.message})
    }
}

export const getData=async(req,res)=>{
    let user = await userRegData.findById(req.params.id)

    res.status(200).json(user);
}