const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://tekuzm:WlFYN5ERYhx6nMBq@cluster0.9ckn8lt.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => console.log(error));
