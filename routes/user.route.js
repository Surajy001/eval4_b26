const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { UserModel } = require("../modal/user.model");
require("dotenv").config();


const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body;
    // const existinguser=await user.find({email});
    //             if(existinguser){
    //                 return res.status(400).json({error:"User already exist, please login"})
    //             }
    try{
        bcrypt.hash(password,7,async(err,hash)=>{
            if(err){
                res.json({error:err.message})
            }else{
            const existinguser=await UserModel.findOne({email});
                if(existinguser){
                    return res.status(400).json({error:"User already exist, please login"})
                }
                const user=await new UserModel({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.json({msg:"User Registered",user:req.body})
            }
        })
    }catch(err){
        res.json({error:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {password,email}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({_id:user._id},process.env.secret)
                    res.json({msg:"Login Successful",token})
                }else{
                    res.json({error:"Wrong Credentcial"})
                }
            })
        }else{
            res.json({msg:"user does not exist"})
        }
    }catch(err){
        res.json({error:err.message})
    }
})

module.exports={
    userRouter
}