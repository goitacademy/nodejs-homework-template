const mongoose = require("mongoose");

require("dotenv").config();
let uriDb = null;

if (process.env.NODE_ENV === "test") {
  uriDb = process.env.DB_HOST_TEST;
} else {
  uriDb = process.env.DB_HOST;
}

const db = mongoose.connect(uriDb, {
  userNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
});

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to database`);
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log(`Mongoose disconnected`);
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconnect database");
    process.exit();
  });
});

module.exports = db;
