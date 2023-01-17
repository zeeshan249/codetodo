const mongoose = require ('mongoose');
MONGODB_URL = process.env.MONGODB_URL;
exports.todoDB = () =>{
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(
        console.log("Connection to MongoDB Successfull!")
    ).catch((error) =>{

        console.log(error);
        console.log("Connection to MongoDB Failed!");
        process.exit(1);
    })
}