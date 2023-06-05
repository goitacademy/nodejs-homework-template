const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Volodymyr:ZcnZ7sZ2zRxbvWgq@cluster0.9dazmdf.mongodb.net/my-contacts?retryWrites=true&w=majority";
// ZcnZ7sZ2zRxbvWgq

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
