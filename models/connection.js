const mongoose = require("mongoose");

require("dotenv").config();

const url = process.env.DB_HOST;

const connection = async () => {
  return mongoose.connect(url);
};


module.exports = {
  connection,
};