const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
require("dotenv").config();

const app=express();
app.use(express.json())

app.use("/users",userRouter)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
     await connection
     console.log(`Server Port ${process.env.port} Running`);
     console.log("Connected to the DataBase");
    }catch(err){
        console.log(err.message);
        console.log("Something Wrong");
    }
})