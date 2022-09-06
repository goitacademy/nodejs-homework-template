const mongoose = require("mongoose");
const DB_HOST = process.env.DB_HOST;
const connectMongo = async () => {
  return await mongoose.connect(DB_HOST, { dbName: "db-contacts" });
};
module.exports = {
  connectMongo,
};
