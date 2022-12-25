const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

async function start() {
  try {
    await mongoose.connect(DB_HOST);

    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
}

start();
