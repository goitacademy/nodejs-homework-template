const mongoose = require("mongoose");

const app = require("./app");

// const { DB_HOST, PORT = 3000 } = process.env;

const DB_HOST =
  "mongodb+srv://303vlad:EYF3TJOC18YKtb2f@cluster0.05vjugd.mongodb.net/db-contacts?retryWrites=true&w=majority";

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
