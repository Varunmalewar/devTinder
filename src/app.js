// import the express
const express = require('express');
const connectDB = require("./config/database")
const User = require("./models/user")

//creating an instance of express 
const app = express();

app.post("/signup", async (req,res)=>{
    // Creating new instance of user model 

    const user = new User( {
        firstName : "Virat",
        lastName : "kohli",
        email : "virat.cse22@sbjit.edu.in",
        password : "Varun@123",
        age: 21,
        gender : "Male"
    })

    


    // .save() help to store user data into the database it always returns a promise therefore we use await .
    await user.save();

    res.send("user added successfully");


})






connectDB().then(()=>{
    console.log("Database connection established")

    app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

}).catch(err=>{
   console.log("Database is not established ")
})





































