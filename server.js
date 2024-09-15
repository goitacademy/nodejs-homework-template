const colors = require("colors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = require("./app");

const port = process.env.PORT;

mongoose
  .connect(process.env.DB_URL)
  .then((db) => {
    console.log("Database is connected.".cyan);
    app.listen(port, () => {
      console.info(`Server is running on port ${port}.`.green);
    });
  })
  .catch((err) => {
    console.log(err.red);
    process.exit(1);
  });
