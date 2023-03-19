const mongoose = require("mongoose");
require("dotenv").config();

let MONGO_CONNECTION = null;

switch (process.env.NODE_ENV) {
  case "test":
    MONGO_CONNECTION = process.env.MONGO_CONNECTION_TEST;
    break;
  case "development":
    MONGO_CONNECTION = process.env.MONGO_CONNECTION;
    break;
  default:
    // Here would be DB connection link to prod DB if we had one
    MONGO_CONNECTION = process.env.MONGO_CONNECTION;
    break;
}

const db = mongoose.connect(MONGO_CONNECTION, {
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose: Database connection successful.");
});

mongoose.connection.on("error", error => {
  console.log(`Mongoose: Error Database connection: ${error.message}.`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose: Database connection terminated.");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Database connection terminated.");
    process.exit(1);
  });
});

module.exports = db;