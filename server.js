const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
mongoose.set("strictQuery", false);

const { HOST_URI } = process.env;

const main = async () => {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");

    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log("Error while connecting MongoDB: ", error.message);
    process.exit(1);
  }
};

main();
