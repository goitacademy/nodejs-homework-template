const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const { HOST_DB, PORT } = process.env;
async function main() {
  try {
    await mongoose.connect(HOST_DB);
    console.log("Database connection successful");

    app.listen(PORT, (error) => {
      if (error) {
        throw error;
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}
main();
