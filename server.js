const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const app = require("./app");

const port = 5000;

const DB_HOST =
  "mongodb+srv://InnaTer:PC5vc2t4yVhVikbG@cluster0.ra60b6t.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(port);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
