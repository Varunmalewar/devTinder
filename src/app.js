// import the express
const express = require('express');
const connectDB = require("./config/database")
const User = require("./models/user")

//creating an instance of express 
const app = express();

// to write middleware we use app.use so as it is being activated for all the routes
app.use(express.json());

app.post("/signup", async (req,res)=>{

    
    // Creating new instance of user model 
    const user = new User( req.body)
    


    // .save() help to store user data into the database it always returns a promise therefore we use await .
    try{
        await user.save();
        res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("error saving the user : "+err.message)
    }

    

})


// DB operation are done always using async and await 
// Get user by email
app.get("/user",async(req,res)=>{
    const userEmail = req.body.email;

    try{

        const user = await User.findOne({email:userEmail});
        if(!user){
            return res.status(404).send("user not found"); 
        }
        res.send(user);
    //    const user= await User.find({email : userEmail})
    //    if(user.length=== 0 ){
    //     res.status(404).send("user not found")
    //    }
    //  else {  res.send(user); }

    }
    catch(err){
        res.status(400).send("Something went wrong ");

    }


})

//Feed API - GET /feed - get all the users from the database
app.get("/feed",async (req,res)=>{

    try{
        const user= await User.find({})  // to get all the users of collection 
        res.send(user)


    }
     catch(err){
        res.status(400).send("Something went wrong ");

    }
    




});












connectDB().then(()=>{
    console.log("Database connection established")

    app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

}).catch(err=>{
   console.log("Database is not established ")
})





































