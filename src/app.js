// import the express
const express = require('express');

//creating an instance of express 
const app = express();



//handle the code 


// This will only handle get call to user 
app.get("/user",(req,res)=>{
    res.send({fisrtname: "Varun", Lastname : "Malewar"});
})



app.post("/user",(req,res)=>{
    console.log("Save data to the database ")
    // saved data to the DB 
    res.send("Data is successfully saved to the database");
})


// This will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
    res.send("Hello from the server");
})



app.listen(3000 , ()=>{
    console.log("server is running on port 3000");
});

