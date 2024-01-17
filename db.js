const mongoose = require("mongoose");
const { serverPort, mongoConnectionString } = require("./config");

const connect = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
  } catch (error) {
    console.log(error);
    throw new Error("Database connection failed");
  }
};

const disconnect = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
  } catch (error) {
    console.log(error);
    throw new Error("Cannot disconnect from database!");
  }
};

module.exports = {
  connect,
  disconnect,
};
