// import the express
const express = require('express');
const connectDB = require("./config/database")



const cookiesParser = require('cookie-parser')


//creating an instance of express 
const app = express();




// to write middleware we use app.use so as it is being activated for all the routes
app.use(express.json());
app.use(cookiesParser());



const authRouter = require("./Routes/auth");
const requestRouter = require("./Routes/request");
const profileRouter = require("./Routes/profile");
const userRouter = require('./Routes/user');


app.use("/",authRouter);
app.use("/",requestRouter);
app.use("/",profileRouter);
app.use("/",userRouter);













connectDB().then(()=>{
    console.log("Database connection established")

    app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

}).catch(err=>{
   console.log("Database is not established ")
})





































