const mongoose = require("mongoose");

const connectMongo = async function () {
  return await mongoose.connect(process.env.MONGO_URL);
};
mongoose.set("strictQuery", false);

module.exports = {
  connectMongo,
};
