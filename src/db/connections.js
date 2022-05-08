const mongoose = require("mongoose");

const connectMongo = async() => {
  return mongoose.connect(process.env.MONGODB_URL);
};

module.exports = {
  connectMongo
};
