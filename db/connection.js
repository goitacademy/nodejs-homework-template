const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = () => {
  return mongoose.connect(process.env.MONGO_URl);
};

module.exports = {
  connectMongo,
};
