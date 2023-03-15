const mongoose = require('mongoose');


const url = 'mongodb+srv://mirzakhanovamari:testcluster@cluster0.icwx1gn.mongodb.net/?retryWrites=true&w=majority';



const connectMongo = async () => {
  return mongoose.connect(url);
  // console.log("Database connection successful");
};

// connectMongo()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());


module.exports = {
  connectMongo
};