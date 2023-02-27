const mongoose = require("mongoose");
const app = require("./app");

const dotenv = require("dotenv");
dotenv.config();

const { HOST_URL } = process.env;

const main = async () => {
  try {
    await mongoose.connect(HOST_URL);
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Main failed", error.message);
  }
};
main();
