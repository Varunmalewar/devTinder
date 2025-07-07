const express = require('express');
// const User = require("../models/user")
const {userauth} = require("../middleware/auth");

const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest",userauth, async (req,res)=>{

    const user = req.user;
    // Send only one response
    console.log("Sending connection request")
    res.send(user.firstName  + " sent the connection request");

})














module.exports = requestRouter;