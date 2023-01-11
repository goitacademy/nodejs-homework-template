// const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);
dotenv.config();

const { HOST_URI } = process.env;

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Connected to mongodb!");
  } catch (error) {
    console.error("Error while connecting to mongodb", error.message);
    process.exit(3);
  }
}

main();
