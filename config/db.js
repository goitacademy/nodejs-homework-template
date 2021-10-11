require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.URL_DB;

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connection to DB");
});

mongoose.connection.on("error", () => {
  console.log(`Mongoose connection error ${error.message}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection for DB closed");
  process.exit();
});

module.exports = db;
