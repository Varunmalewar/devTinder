// import the express
const express = require('express');

//creating an instance of express 
const app = express();



//handle the code 
app.use("/user",

(req,res,next)=>{
 
    console.log("Handling the route ")
    res.send("The response done ") 
    next();


},
(req, res , next)=>{
    // another route handler inside existing route 
    res.send("The response done 2 ")
    console.log("Handling the route 1 ka 2 ")
    next();
},
(req, res , next)=>{
    res.send("The response is done no. 3 ")
    console.log("Handling the route 1 ka 3 ")
    next();
}
);



app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

