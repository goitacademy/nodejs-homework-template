const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://lUtilizatorl:Stas240984@cluster0.cz8qneh.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

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
