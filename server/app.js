require('dotenv').config();
require('./config/database').todoDB();

const express = require ("express");
const cors = require ("cors");
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(cors());
//middleware section starts
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.get('/',(req,res)=>{
//     res.status(200).send("Baby Steps Kui kui kui");
// })


app.use("/", userRoutes);


//middleware section ends


module.exports = app;
