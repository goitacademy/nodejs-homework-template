const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Yuliya:1ahWEQTo1u3MxMS1@cluster0.zagjwqp.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
