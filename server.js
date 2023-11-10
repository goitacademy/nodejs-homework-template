const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://borysenko343:bw9MUqkkf6cbMBvN@first-cluster.aupshba.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.massege);
    process.exit(1);
  });
