const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Andriy:P*uWves3rr343-L@cluster0.5zpculu.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
