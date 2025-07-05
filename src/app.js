// import the express
const express = require('express');
const connectDB = require("./config/database")
const User = require("./models/user")

//creating an instance of express 
const app = express();

// to write middleware we use app.use so as it is being activated for all the routes
app.use(express.json());

app.post("/signup", async (req,res)=>{

    // Remove photoUrl if empty or falsy to allow default to apply
    if (!req.body.photoUrl) {
        delete req.body.photoUrl;
    }
    
    // Creating new instance of user model 
    const user = new User( req.body)
    


    // .save() help to store user data into the database it always returns a promise therefore we use await .
    try{
        await user.save();
        console.log(user); // Log user document to check timestamps
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






//delete api 
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        // short hand const user = await User.findByIdAndDelete({_id : userId}); for is next line
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully")
        
    }
    
    catch(err){
        res.status(400).send("Something went wrong ");
    }
})



//update data of user 
app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"]

        // allowed keys 
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed ");
        }

        // Convert skills to array if it's a string
        // if (data.skills && typeof data.skills === 'string') {
        //     data.skills = data.skills.split(',').map(skill => skill.trim());
        // }

        if(data?.skills.length>7){
            throw new Error("Skill limit exceeed")
        }

        const dete=await User.findByIdAndUpdate({_id: userId }, { $set: data }, {
            runValidators: true,
            returnDocument: "after"
        }) 
        console.log(dete)
        res.send("user updated successfully")

    }
    catch(err){
        res.status(400).send("Something went wrong "+err.message);
    }
})
















connectDB().then(()=>{
    console.log("Database connection established")

    app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

}).catch(err=>{
   console.log("Database is not established ")
})





































