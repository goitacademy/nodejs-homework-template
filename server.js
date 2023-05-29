const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Vladimir:JHmQ8gsU2UhG1WD9@cluster0.nhx4hqt.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connect success");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
