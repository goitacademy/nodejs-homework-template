const app = require("../app");
require("dotenv").config();
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
const { PORT = 5000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
