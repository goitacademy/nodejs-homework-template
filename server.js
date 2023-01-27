const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });