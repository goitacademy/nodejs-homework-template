const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectMongo,
};
