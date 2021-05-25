const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
});

mongoose.connection.on("connected", () =>
  console.log("Mongoose connected to db")
);

mongoose.connection.on("error", (err) =>
  console.log("Mongoose connection error " + err.message)
);

mongoose.connection.on("disconnected", () =>
  console.log("Mongoose disconnected")
);

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconnect Mongodb");
    process.exit();
  });
});

module.exports = db;
