const express = require('express');
const  {validateSignUpData} = require("../utils/validation")
const User = require("../models/user")
const bcrypt = require("bcrypt");
const authRouter = express.Router();




authRouter.post("/signup", async (req,res)=>{

    // Remove photoUrl if empty or falsy to allow default to apply
    // if (!req.body.photoUrl) {
    //     delete req.body.photoUrl;
    // }

    try{
    // Validation of data  
    validateSignUpData(req);

    const{firstName,lastName,email,password}= req.body

    //Encrypt the password 
    const passwordHash = await bcrypt.hash(password,10) 
    console.log(passwordHash)

    // Store user in the database 


    
    // Creating new instance of user model 
    const user = new User( {
        firstName,lastName,email,password:passwordHash
    })
    


    // .save() help to store user data into the database it always returns a promise therefore we use await .
    
        await user.save();
        console.log(user); // Log user document to check timestamps
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("error saving the user : "+err.message)
    }

    
})


const validator = require('validator');

authRouter.post("/login",async(req,res) =>{
    try{
        // Validation of data
        const {email, password} = req.body;

        if(!email || !validator.isEmail(email)){
            return res.status(400).send("Invalid email");
        }
        if(!password){
            return res.status(400).send("Password is required");
        }

        // Proceed with login logic here (not changed)

        const user = await User.findOne({email : email})
        if(!user){
            return res.status(400).send("Email invalid credentials");
        } 

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            // Create a JWT token
            const token = await user.getJWT();
            // Log the token to the console
            console.log(token)


            // Add token to cookie and send the response back to the user 
            res.cookie("token", token)
            
            return res.send("Login Successfull");
        }
        else{

            return res.status(400).send("Password is Invalid");
        }


    }
    catch(err){
        res.status(400).send("ERROR :"+err.message)
    }
})


authRouter.post("/logout",async(req,res)=>{
    // try{
    //     // Clear the cookie by setting its maxAge to 0
    //     res.cookie("token", "", { maxAge: 0 });
    //     res.send("Logout successful");
    // }
    // catch(err){
    //     res.status(400).send("Error logging out: " + err.message);
    // }
    // or

    try{
        // Clear the cookie
        res.cookie("token",null,{
            expires: new Date(Date.now()),

        });
        res.send("Logout successful");

    }
    catch(err){
        res.status(400).send("Error logging out: " + err.message);
    }
})




module.exports = authRouter;