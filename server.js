const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();



const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .then(() => console.log(`Server running. Use our API on port: ${PORT}`))
  .catch((err) => {
    console.error("ERROR ", err);
    process.exit(1);
  });
