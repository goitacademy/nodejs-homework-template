const mongoose = require("mongoose");

require("dotenv").config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (error) => {
  console.log(`Mongoose connection error: ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconnect from MongoDB");
    process.exit();
  });
});

module.exports = db;
