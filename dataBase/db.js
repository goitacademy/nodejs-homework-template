const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const dataBase = mongoose.connect(MONGODB_URI, {
  dbName: "db-contacts",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection to Data Base is closed");
  process.exit();
});

module.exports = dataBase;
