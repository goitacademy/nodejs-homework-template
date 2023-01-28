const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGO_URL;

mongoose.set("strictQuery", false);

const connectMongo = async () => {
  return mongoose.connect(mongoUrl);
};

module.exports = {
  connectMongo,
};
