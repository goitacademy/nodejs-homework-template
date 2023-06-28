const app = require("./app");

const mongoose = require("mongoose");

const BD_HOST =
  "mongodb+srv://dimbor:hq4sZHjna5XwFcDV@cluster0.34quhxl.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(BD_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
