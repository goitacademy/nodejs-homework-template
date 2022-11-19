const app = require("./app");
require("dotenv").config()
const mongoose = require("mongoose");


const { DB_HOST, PORT=3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log("Database connection error" + error);
    process.exit(1);
  });

