const mongoose = require("mongoose");

const app = require("./app");

const BD_HOST =
  "mongodb+srv://Paslawsky:3lEs6OB69YNWTSkz@cluster0.stkwc1y.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(BD_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
