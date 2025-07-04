const mongoose = require('mongoose');
const validator =require("validator");

//mogoose schema for user
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        minlength:4,
        required : true,

    },
    lastName :{
        type:String
    },
    email:{
        type:String,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email" + value);
            }
        }
    },
    password:{
        type : String,
        lowercase: true,
        required : true
    },
    age:{
        type: Number ,
        min : 18
    },
    gender:{
        type: String ,
        validate(value){
            if(!['male','female','Male','Female','Other'].includes(value)){
                throw new Error('Invalid gender')
        }}

    },
    photoUrl:
    {
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_1280.png",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL" + value);
            }
        }
        
    },
    about:{
        type:String,
        default: "This is default about the user !"
    },
    skills:{
        type: [String],        // user can have multiple skills
        minlength:5              
    }


},{
    timestamps : true,
});


// user model
const User = mongoose.model("User", userSchema)

module.exports = User;