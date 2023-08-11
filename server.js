const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://andriiyzlt:8paZJSeAEp5N6fm1@cluster-hw3.q6poqc8.mongodb.net/db-contacts?retryWrites=true&w=majority";

// const { DB_HOST, PORT = 3000 } = process.env;

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
