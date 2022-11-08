const mongoose = require("mongoose");

const connectMongoDB = async () => {
  await mongoose.connect(process.env.HOST_DB);
};
console.log("connectMongoDB", connectMongoDB);
module.exports = connectMongoDB;
