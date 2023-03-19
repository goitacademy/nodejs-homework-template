const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.set("debug", true);

const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const { MONGO_URL, PORT } = process.env;

const main = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error("Error while connecting to mongodb", error.message);
    process.exit(1);
  }
};

main();
