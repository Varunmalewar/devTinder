const mongoose = require('mongoose');
const validator =require("validator");
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");

//mogoose schema for user
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        minLength:4,
        // required : true,
        maxLength : 50

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


userSchema.methods.getJWT = async function (){    // not use arrow function here because we want to use 'this'keyword
    const user = this; // 'this' refers to the user document
   const token = await jwt.sign({_id: this._id}, "DEV@Tinder$790", {expiresIn: "7d"});
   return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this; // 'this' refers to the user document
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};


// user model
const User = mongoose.model("User", userSchema)

module.exports = User;