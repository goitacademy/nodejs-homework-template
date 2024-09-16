const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Den123:uxqHufnBCdZ8h1vN@cluster0.dp5onfe.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(() => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = require("./app");
