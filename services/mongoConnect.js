const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoConnect = async () => {
  return mongoose.connect(process.env.DB_HOST);
};

module.exports = {
  mongoConnect,
};
