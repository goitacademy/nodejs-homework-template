const mongoose = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_HOST);
    console.log(
      `MongoDB is connected on Port: ${db.connection.port}, on host ${db.connection.host}, name ${db.connection.name}`
        .green.bold.italic
    );
  } catch (error) {
    console.log(error.message.red.bold.italic);
    process.exit(1);
  }
};

module.exports = connectDB;
