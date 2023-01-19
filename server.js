const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);

const { HOST_DB } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_DB);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Error", error.message);
    process.exit(1);
  }
}
main();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
