const express = require('express');
const profileRouter = express.Router();
// const User = require("../models/user")
const {userauth} = require("../middleware/auth");


profileRouter.get("/profile", userauth,async(req,res)=>{
    try{
   
    const user = req.user;
    
    console.log(user)

    res.send(user);
}

    catch(err){
        res.status(400).send("error fetching user profile : "+err.message)
    }

})










module.exports = profileRouter;