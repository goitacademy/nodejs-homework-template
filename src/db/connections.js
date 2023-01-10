const mongoose = require("mongoose");

const connectMongo = async () => {
  return mongoose.connect(process.env.DB_HOST);
};

module.exports = { connectMongo };
