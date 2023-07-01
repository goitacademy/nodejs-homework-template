require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
