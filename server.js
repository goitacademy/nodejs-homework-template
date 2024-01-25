const mongoose = require("mongoose");
import dotenv from "dotenv";
dotenv.config();

const app = require("./app");
const { DB_HOST, PORT = 4003 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
