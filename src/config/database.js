const mongooes = require('mongoose');


const connectDB = async ()=>{

    await mongooes.connect("mongodb+srv://varunmalewar:ePgKuESxj9kePLSm@og.zz5ppd6.mongodb.net/devTinder");

}


module.exports = connectDB;