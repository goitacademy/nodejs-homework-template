const mongoose = require('mongoose');
const url = 'mongodb+srv://alina:07021993Aa@cluster0.euaoh.mongodb.net/goit?retryWrites=true&w=majority';



const connectMango=async()=>{
  return  await mongoose.connect(url);
}

module.exports={
    connectMango,
   
}