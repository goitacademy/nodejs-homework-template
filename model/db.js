const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful".green);
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`.red);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database connected".yellow);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection for db closed and app termination".red);
  process.exit(1);
});

module.exports = db;
