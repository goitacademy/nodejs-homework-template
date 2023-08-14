require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const { DB_URI, PORT = 3000 } = process.env;

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// 1) Зробити один try catch
// 2) Зедеплоїти на render.com
