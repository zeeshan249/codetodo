const mongoose  = require ("mongoose");

const userSchema = new mongoose.Schema({

    fullName:{
        type: String,
        required:true,
    },
    email:{
    type: String,
    required:true,
    unique:true
    },
 
    password:{
        type:String,
        required:true,
       
    },
    token:{
        type:String
    }




})


module.exports = mongoose.model("allusers",userSchema)