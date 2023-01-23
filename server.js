const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", false);
// mongoose.set("debug", true); // enable logging

const { HOST_URI } = process.env;
const app = require("./app");

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Mongodb connection successful!");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
