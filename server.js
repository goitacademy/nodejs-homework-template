const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", false);

const app = require("./app");

const { MONGO_URI } = process.env;
const PORT = 3000;

async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connection successful");

    app.listen(PORT, (error) => {
      if (error) {
        console.log("error in server launch:", error);
        process.exit(1);
      }
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("main failed:", error.message);
    process.exit(1);
  }
}
main();
