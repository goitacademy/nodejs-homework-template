const mongoose = require("mongoose");
const { app } = require("./app");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Error while connection to MongoDb!", error.message);
    process.exit(1);
  }
}

main();
