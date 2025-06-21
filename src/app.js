// import the express
const express = require('express');

//creating an instance of express 
const app = express();



//handle the code 
app.use("/test",(req,res)=>{
    res.send("Hello from the server");
})
app.use((req,res)=>{
    res.send("Hello ji");
})
app.use("/oyee",(req,res)=>{
    res.send("Hello Kaka");
})


app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

