const mongoose = require('mongoose');

//mogoose schema for user
const userSchema = new mongoose.Schema({
    firstName : {
        type: String
    },
    lastName :{
        type:String
    },
    email:{
        type:String
    },
    passwword:{
        type : String
    },
    age:{
        type: Number 
    },
    gender:{
        type: String 
    }

});


// user model
const User = mongoose.model("User", userSchema)

module.exports = User;