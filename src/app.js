// import the express
const express = require('express');
const connectDB = require("./config/database")
const User = require("./models/user")
const  validateSignUpData = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookiesParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {userauth} = require("./middleware/auth");

//creating an instance of express 
const app = express();




// to write middleware we use app.use so as it is being activated for all the routes
app.use(express.json());
app.use(cookiesParser());
app.post("/signup", async (req,res)=>{

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


//PROFILE API
app.get("/profile", userauth,async(req,res)=>{
    try{
   
    const user = req.user;
    
    console.log(user)

    res.send(user);
}

    catch(err){
        res.status(400).send("error fetching user profile : "+err.message)
    }

})

//Login API
const validator = require('validator');

app.post("/login",async(req,res) =>{
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
            throw new Error ("Email invalid credentials")
        } 

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(isPasswordValid){
            // Create a JWT token
            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790", {expiresIn: "7d"});
            console.log(token)


            // Add token to cookie and send the response back to the user 
            res.cookie("token", token)
            
            res.send("Login Successfull");
        }
        else{
            
            throw new Error("Password is Invalid")
        }


    }
    catch(err){
        res.status(400).send("ERROR :"+err.message)
    }
})


app.post("/sendConnectionRequest",userauth, async (req,res)=>{

    const user = req.user;
    res.send(user.firstName  + "sent the connection request");

    //Sending COnnection request
    console.log("Sending connection request")
    res.send("Connection request sent ")
})


















connectDB().then(()=>{
    console.log("Database connection established")

    app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

}).catch(err=>{
   console.log("Database is not established ")
})





































