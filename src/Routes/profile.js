const express = require('express');
const profileRouter = express.Router();
// const User = require("../models/user")
const {userauth} = require("../middleware/auth");
const {validateEditProfileData} = require("../utils/validation");


profileRouter.get("/profile/view", userauth,async(req,res)=>{
    try{
   
    const user = req.user;
    
    console.log(user)

    res.send(user);
}

    catch(err){
        res.status(400).send("error fetching user profile : "+err.message)
    }

})

profileRouter.patch("/profile/edit",userauth,async(req,res)=>{


    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedInuser = req.user;
        // console.log(loggedInuser)

        // loggedInuser.firstName = req.body.firstName || loggedInuser.firstName;
        // loggedInuser.lastName = req.body.lastName || loggedInuser.lastName;
        // loggedInuser.about = req.body.about || loggedInuser.about;
        // loggedInuser.photoUrl = req.body.photoUrl || loggedInuser.photoUrl;
                             // this is very bad 


        // we should not do this because it will override the value of the field if it is not present in the request body
        // instead we should only update the fields that are present in the request body
        Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key] || loggedInuser[key]));


        await loggedInuser.save(); // Save the updated user document

        // console.log(loggedInuser)

        res.json({message: `${loggedInuser.firstName}, your profile updated successfully`,
            data: loggedInuser    
        });



      
    }
    catch(err){
        res.status(400).send("error editing user profile : "+err.message)
    }


})










module.exports = profileRouter;