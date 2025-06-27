// import the express
const express = require('express');
const {adminauth, userauth} = require ("./middleware/auth.js")

//creating an instance of express 
const app = express();



//Handle the AUth middleware for all request GET , POST , PUT , Delete 
app.use("/admin", adminauth);


app.get("/user",userauth,(req,res)=>{
    res.send("Hello User")
})

app.get("/user/login",(req,res)=>{
    res.send ("user login");
})

// Admin can have multiple api calls
app.get("/admin/getAllData",(req,res)=>{
    // check if request is authorised
    //logic of fething data 
    res.send("data is sent")    
})


app.get("/admin/deleteAllUser",(req,res)=>{
    //logic of fething data 

    res.send("delete user");
})





app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

