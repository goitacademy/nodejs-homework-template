const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST } = process.env;
const connectDb = async () => {
  mongoose.connect(DB_HOST);
  console.log("Database connection successful");
};

app.listen(3000, async () => {
  console.log("Server running. Use our API on port: 3000");
});

connectDb().catch((err) => {
  console.log("error:", err);
  return process.exit(1);
});
