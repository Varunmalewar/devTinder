// import the express
const express = require('express');


//creating an instance of express 
const app = express();



//Handle the AUth middleware for all request GET , POST , PUT , Delete 

app.get("/user/login",(req,res)=>{
    throw new Error("vahjdcjkc");
    
    res.send ("user login");
})

app.use("/",(err,req,res,next)=>{
    if(err){
        //log your error message 
        res.status(500).send("something went wrong ");
    }
})






app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

