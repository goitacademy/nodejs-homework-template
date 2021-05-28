const mongoose = require("mongoose");
require("dotenv").config();
const uriDB = process.env.URI_DB;

const db = mongoose.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

mongoose.connection.on("connected", () => {
  console.log(`Database connection successful ${uriDB}`);
});

mongoose.connection.on("error", (error) => {
  console.log(`Error database connection ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Database disconnected`);
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection to db terminated");
    process.exit(1);
  });
});

module.exports = db;
