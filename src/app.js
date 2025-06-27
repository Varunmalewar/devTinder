// import the express
const express = require('express');

//creating an instance of express 
const app = express();



//handle the code 
app.use("/",(req,res,next)=>{
    next();
})



app.get("/user", (req, res, next)=>{
    console.log("Handling the route user 2 ");
    res.send("2nd Route handler");
    next();
})
app.get("/user", (req , res , next )=>{
    console.log("Handling the route user ");
    // next();
});




app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

