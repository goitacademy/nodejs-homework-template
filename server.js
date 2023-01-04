const app = require("./app");
const mongoose = require("mongoose");

const { connectMongo } = require("./db/connect");
require("dotenv").config();

const start = async () => {
  try {
    await connectMongo();
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
};
start();
