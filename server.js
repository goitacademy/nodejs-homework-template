

const mongoose = require("mongoose");
const app = require("./app");
const DB_HOST = "mongodb+srv://Taisiya:6X6aJ8WmZcw9bpt@cluster0.7s4fdgl.mongodb.net/db_contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1); })
