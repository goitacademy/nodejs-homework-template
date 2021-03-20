const mongoose = require("mongoose");

const uriDb =
  "mongodb+srv://muron:muron@cluster0.ft41c.mongodb.net/db-contacts?retryWrites=true&w=majority";

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Connection for DB disconneted and app terminated");
    process.exit(1);
  });
});

module.exports = db;
