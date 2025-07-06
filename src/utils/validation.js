const validator = require ('validator')


const validateSignUpData = (req) =>{
    const  {firstName,lastName,email,password} = req.body;
    if(!firstName || !lastName){
        throw new Error ("Name is not valid ");
    }
    else if(firstName.length<4 || firstName.length>50){
        throw new Error("Name should be between 4 and 50 characters");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password should be strong")
    }


}
module.exports = validateSignUpData;