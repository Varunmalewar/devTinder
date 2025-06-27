const adminauth = (req,res,next)=>{
    console.log("Admin is getting checked")
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("unauthorised data")

        
    }
    else{
        next();
    }

}
const userauth = (req,res,next)=>{
    console.log("User is getting checked")
    const token = "xyz";
    const isAdminAuthorised = token === "xyz";
    if(!isAdminAuthorised){
        res.status(401).send("unauthorised data")

        
    }
    else{
        next();
    }

}
module.exports = { adminauth,userauth}