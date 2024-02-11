require("dotenv").config();
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const mongoose = require("mongoose");
const app = require("./app");

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
  app.listen(PORT, () => {
    console.log("Server running. Use our API on port: 3000");
  });
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from the database");
  process.exit(1);
});
