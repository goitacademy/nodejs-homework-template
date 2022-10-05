const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_HOST } = process.env;

const conectMongo = async () => {
  return await mongoose
    .connect(DB_HOST)
    .then(() => console.log("Database connection successful"))
    .catch((error) => console.log(error.message));
};

module.exports = {conectMongo}