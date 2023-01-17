const express = require('express');
require("dotenv").config();
const bcrypt = require('bcryptjs');
const User= require('../model/user');
const jsonwebtoken = require('jsonwebtoken');
const user = require('../model/user');
const app = require('../app');


exports.registration = async (req,res) =>{
    try{
     const {fullName,email,phone,password} = req.body;
     if (!(fullName && email  && password)) {
        res.status(401).send("All fields are required!");
    } 

    //unique user check
     const uniqueUserCheck = await User.findOne({email});
     if(uniqueUserCheck){
     res.status(401).json({
        success:false,
        message: "User Already Exist"
     });
     }

     //hash user password using bcrypt
     var hashPassword = await bcrypt.hash(password, 10);

    

     //creating a new user 
     const newUser = await User.create({
        fullName,
        email,
        phone,
        password: hashPassword
     });


      //create token

        const datatobetokenized ={
        id:newUser._id,
         }
       
      const token =await jsonwebtoken.sign(datatobetokenized,process.env.SECRET,{ expiresIn: 60 * 60 })
      newUser.token =token; //filling the token to the current newUser object as a new key value pair
      newUser.password = undefined; //don't want to send this password 

      res.status(201).json({
          success : true,
          newUser,
          message: "Registration Done"
      })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

exports.login = async  (req, res)=>{

    try {
        
        const  {email,password} = req.body;

            if (!(email && password)) {
               res.status(401).send("email and password are required.")
               console.log("user not found1")
               return ;
            }

        const  user  = await User.findOne({email});
        if (!user) {
                console.log("user not found2")
           res.json({
                success : false,
                message:"Email doesn't exist,please create account!"})
                return ;
        }

        if (user && (await bcrypt.compare(password,user.password)) ) {
           
            logintokendata={
                id:user._id,
           
            }

           const token =  jsonwebtoken.sign(logintokendata,process.env.SECRET);
           user.password = undefined;
           user.token =token;

           const  options = {
                expires : new Date(Date.now()+ 3*24*60*60*1000 ), //to expire in 3 days for 3 hours (3*60*60*1000)
                httpOnly : true,
                sameSite :'None',
                secure : true
           }
                console.log("--->logged in")
         return  res.status(200).cookie("token",token,options).json({
                success : true,      
                user
           })
        }else{
           return res.status(200).json({
            success :false,
            message : "password didn't matched!"
           })
        }
        
    } catch (error) {
        console.log(error);
        console.log("Bad Request");
      return  res.status(401).send("Bad Request");
    }
};

exports.userdata = async  (req, res)=>{
  
  
     const {token} = req.body;
     const userverify = jsonwebtoken.verify(token, process.env.SECRET);
     if(!userverify){
        return  res.status(401).send("Bad Request");   
     }
     else{
        _id=userverify.id;
        const email= await User.findById(_id)
        return  res.status(200).send(email);
     }
 
   
};