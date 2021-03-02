const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connect", () => {
  console.log("Mongoose connection to db");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection to error ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected ");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection for db closed and app termination");
  process.exit(1);
});

module.exports = db;
