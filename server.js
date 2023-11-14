require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strict", true);

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
