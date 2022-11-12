const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//* connect to MongoDB
// const DB_HOST= data from file;

// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log('Database connect success'))
//   .catch(error => console.log(error.message));

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log('Database Mongo DB connect success');
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  connectToDB,
};
