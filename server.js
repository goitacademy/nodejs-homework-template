const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { DB_HOST } = require("./config");
dotenv.config();
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => console.log("Database connection successful"))
  )
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
