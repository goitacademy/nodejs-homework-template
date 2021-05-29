const mongoose = require("mongoose");

require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose cnnection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Database disconnected");
    process.exit(1);
  });
});

module.exports = db;
