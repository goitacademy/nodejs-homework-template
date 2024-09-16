const app = require("./app");
const dotenv = require("dotenv");
dotenv.config("./.env");

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT;

const mongoose = require("mongoose");
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
