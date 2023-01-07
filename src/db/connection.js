const mongoose = require("mongoose");
require("dotenv").config();
// mongoose.Promise = global.Promise;

const mongoConnect = async () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { mongoConnect };
