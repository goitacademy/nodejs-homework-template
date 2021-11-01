const mongoose = require("mongoose");
require("dotenv").config();
let uri;

if (process.env.NODE_ENV == "test") {
  uri = process.env.URI_DB_TEST;
} else {
  uri = process.env.URI_DB;
}

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV == "test") {
  mongoose.connection.on("conected", () => {
    console.log("Database connection successful");
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Database connection error ${err.message}`);
  });
}

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Database connection successful");
  process.exit();
});

module.exports = db;
