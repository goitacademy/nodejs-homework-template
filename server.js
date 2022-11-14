const app = require('./app');

const mongoose = require('mongoose');
//* connect to MongoDB // const DB_HOST= data from file;

// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log('Database connect success'))
//   .catch(error => console.log(error.message));

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log('Database Mongo DB connect success');
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// **************************************************
//! Connect to DB
connectToDB();
// **************************************************
