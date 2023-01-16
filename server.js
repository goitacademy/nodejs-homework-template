const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;

async function main() {
  try {
    mongoose.connect(HOST_URI);
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
