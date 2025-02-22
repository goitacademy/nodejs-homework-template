const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

const app = require("./app");

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
