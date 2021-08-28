const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const { DB_HOST } = process.env;
const db = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});
mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});
mongoose.connection.on("error", (error) => {
  console.log("Error mongoose connection");
});
mongoose.connection.on("disconnected", (error) => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection to DB terminated");
    process.exit(1);
  });
});

module.exports = db;
