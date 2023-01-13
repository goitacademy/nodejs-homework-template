const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const { HOST_URI } = process.env;
mongoose.set("strictQuery", false);

async function main() {
  try {
    await mongoose.connect(HOST_UR, {}).then(() => {
      console.log("Database connection successful");
    });
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
