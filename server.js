const dotenv = require("dotenv");
dotenv.config();
const { app } = require("./app");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const { HOST_URI, PORT } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection is successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main();