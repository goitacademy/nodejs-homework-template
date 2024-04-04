const app = require("./app");
const mongoose = require("mongoose");
const colors = require("colors");

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful".bgBlue);
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`.bgYellow);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
