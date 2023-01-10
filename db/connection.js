const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

const uriDb = process.env.DB_HOST;

mongoose.Promise = global.Promise;

const connectionToDB = async () => {
  return mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectionToDB,
};
