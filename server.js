const app = require('./app');

const mongoose = require('mongoose');
//* connect to MongoDB // const DB_HOST= data from file;

// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log('Database connect success'))
//   .catch(error => console.log(error.message));
const { DB_HOST, PORT = 3000 } = process.env;

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(PORT, () => {
      console.log('Database MongoDB/contacts connection successful');
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
