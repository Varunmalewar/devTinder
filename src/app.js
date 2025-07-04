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






connectDB().then(()=>{
    console.log("Database connection established")

    app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

}).catch(err=>{
   console.log("Database is not established ")
})





































