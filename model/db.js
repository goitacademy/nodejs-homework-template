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
  console.log(`Connection open ${uriDb}`);
});
mongoose.connection.on("error", (e) => {
  console.log(`Error mongoose connection ${e.message}`);
});
mongoose.connection.on("disconnected", (e) => {
  console.log(`Mongoose disconnection`);
});
process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("connection to DB terminated");
    process.exit(1);
  });
});

module.exports = db;
