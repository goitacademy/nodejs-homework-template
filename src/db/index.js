const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = new mongoose.connect(uriDb, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose disconnected`);
});

//событие закртие приложения
process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection for DB disconnected and app terminated");
    process.exit(1);
  });
});

module.exports = db;
