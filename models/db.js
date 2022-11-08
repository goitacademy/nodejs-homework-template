const mongoose = require("mongoose");
require("dotenv").config();
const {HOST_DB} = process.env;
console.log("process:", process.env.HOST_DB);
const db = mongoose.connect(HOST_DB, {
  useNewUrlParser: true,
  // usecreateindex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});
console.log("Database: ", db);
mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Database connection closed and app termination");
  process.exit(1);
});

module.exports = db;
