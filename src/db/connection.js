const mongoose = require("mongoose");

const uriDb = process.env.DB_HOST;

const connectMongo = async () => {
  return mongoose.connect(uriDb, { dbName: "db-contacts" });
};

module.exports = { connectMongo };
