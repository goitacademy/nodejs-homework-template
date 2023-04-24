const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB = await mongoose.connect(process.env.DB_HOST);
    // console.log(
    //   `MongoDB is connected. On PORT: ${DB.connection.port}. DBHost: ${DB.connection.host}. Name: ${DB.connection.name}.`
    // );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
