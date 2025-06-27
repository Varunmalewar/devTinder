// import the express
const express = require('express');

//creating an instance of express 
const app = express();



//Handle the AUth middleware for all request GET , POST , PUT , Delete 
app.use("/admin",(req,res,next)=>{
    console.log("Admin is getting checked")
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("unauthorised data")

        
    }
    else{
        next();
    }

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

