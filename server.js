const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Yuliya:DvSL0bsBUxr7yvS9@cluster0.krvjw1l.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
