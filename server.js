const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;

const port = 5151;

(async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful!");

    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  } catch (error) {
    console.error("Error while connecting to Mongodb", error.message);
    process.exit(1);
  }
})();
