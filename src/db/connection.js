const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose.set("strictQuery", false);
  mongoose.Promise = global.Promise;
  await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
