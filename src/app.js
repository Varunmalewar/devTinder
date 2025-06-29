// import the express
const express = require('express');
const connectDB = require("./config/database")

//creating an instance of express 
const app = express();

connectDB().then(()=>{
    console.log("Database connection established")

    app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

}).catch(err=>{
   console.log("Database is not established ")
})





































