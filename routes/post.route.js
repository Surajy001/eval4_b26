const express=require("express");
const { PostModel } = require("../modal/post.model");
const { auth } = require("../middleware/auth.middleware");
require("dotenv").config();


const postRouter=express.Router()

postRouter.use(auth)
postRouter.post("/add",async(req,res)=>{
    const payload=req.body
   try{
    const post= new PostModel(payload)
    await post.save()
    res.json({msg:"New Post has been Added"})
   }catch(err){
       res.json({error:err.message})
   }
})

postRouter.get("/",async(req,res)=>{
    try{
        const posts= await PostModel.find({device:req.body.device})
        res.send(posts)
    }catch(err){
        res.json({error:err.message})
    }
 })

 postRouter.patch("/update/:id",async(req,res)=>{
    const UserIDinUserDoc=req.body._id
    const {id}=req.params
    try{
        const posts=await PostModel.find({_id:id})
        const UserIDinPostDoc=posts._id
        if(UserIDinUserDoc===UserIDinPostDoc){
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            res.json({msg:`${posts.title} has been updated`})
        }else{
            res.json({msg:`Not Authorized`})
        }
    }catch(err){
        res.json({error:err.message})
    }
 })

 postRouter.delete("/delete/:id",async(req,res)=>{
    const UserIDinUserDoc=req.body._id
    const {id}=req.params
    try{
        const posts=await PostModel.findOne({_id:id})
        const UserIDinPostDoc=posts._id
        if(UserIDinUserDoc===UserIDinPostDoc){
            await PostModel.findByIdAndDelete({_id:id},req.body)
            res.json({msg:`${posts.title} has been Deleted`})
        }else{
            res.json({msg:`Not Authorized`})
        }
    }catch(err){
        res.json({error:err.message})
    }
 })


module.exports={
    postRouter
}

