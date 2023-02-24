const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_HOST, {
    promiseLibrary: global.Promise,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
