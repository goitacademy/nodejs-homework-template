const app = require('./app')
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("Database connection successful, starting webserver...");
    app.listen(3000, () => console.log("Server is running on port: 3000"));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
