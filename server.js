const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const { DB_HOST } = process.env;

async function start() {
  try {
    await mongoose.connect(DB_HOST);

    console.log("Successfully connected to database");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}

start();
