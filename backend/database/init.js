const mongoose=require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.mongodbURI;
module.exports=function(){
  return mongoose.connect(uri);
}