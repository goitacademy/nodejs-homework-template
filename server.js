const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://klokunSerhii:juNYSAkoje986zRg@cluster0.yg83efa.mongodb.net/contact	?retryWrites=true&w=majority";

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
