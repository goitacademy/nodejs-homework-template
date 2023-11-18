const app = require("./app");
const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://volkigor286:hTvYhyBml3UA7bsr@cluster0.inloeca.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then((data) => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
