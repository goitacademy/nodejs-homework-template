// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../.env") });
const BASE_URL = process.env.BASE_URL_MONGO;

const connectMongo = async () => {
  return await mongoose.connect(BASE_URL, { dbName: "db-contacts" });
};

module.exports = { connectMongo };
