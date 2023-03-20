const mongoose = require('mongoose');
require('dotenv').config();
const connection = () => {
  return mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connection,
};