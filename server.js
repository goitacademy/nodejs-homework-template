const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

//const PORT = process.env.PORT || 3000;

//const { DB_HOST } = process.env;

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful".cyan);
    console.log(`Server running. Use our API on port: ${PORT}`.cyan);
  })
  .catch((error) => {
    console.log(`${error}`.red);
    process.exit(1);
  });