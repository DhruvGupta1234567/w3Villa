const mongoose = require("mongoose");
const mongoUrl="mongodb://0.0.0.0:27017/TaskManagement"

const mongodb=async()=>{
    await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },).then((res) => {
        console.log("Database connected");
      }).catch(error => {
         console.log(error);
       });}

module.exports=mongodb;