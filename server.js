const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const DB_URL = process.env.DB_HOST;

mongoose.connect(DB_URL);

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
