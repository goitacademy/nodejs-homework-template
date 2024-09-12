const mongoose = require('mongoose');

const {getConectionUrl}=require('./utils');
// mongoose.Promise = global.Promise;

async function getConection(){
mongoose.set('strictQuery', false)
// const url=getConectionUrl()
//  console.log(url)
// console.log("Database connection successful")
return mongoose.connect(getConectionUrl());
}



module.exports=getConection