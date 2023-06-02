const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://newUser:newUser@cluster0.mq21xre.mongodb.net/db-contacts?retryWrites=true&w=majority"
);

const connect = () => {
  try {
    connection.then(() => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connect };
