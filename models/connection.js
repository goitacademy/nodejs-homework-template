/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoConnect = async () => {
  return mongoose.connect(process.env.DB_URL);
};

module.exports = {
  mongoConnect,
};
