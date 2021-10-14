const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.URI_DB;

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("conected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error ${err.message}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Database connection successful");
  process.exit();
});

module.exports = db;
