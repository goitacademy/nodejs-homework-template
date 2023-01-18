const app = require("./app");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dotenv = require("dotenv");

dotenv.config();

const { HOST_URL } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_URL);
    console.log("Database connection successful");

    app.listen(3001, () => {
      console.log("Server running. Use our API on port: 3001");
    });

  } catch (error) {
    console.error("Error while connection mongodb");
    process.exit(1);
  }
}

main();
