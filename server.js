const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Yuliya:2d3PDln8OddwGswZ@cluster0.guuu5gj.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000 url");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
