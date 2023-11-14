const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env["DB_URI"];

async function run() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.error);
