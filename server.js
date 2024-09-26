const mongoose = require("mongoose");
const app = require("./app");
const DB_HOST =
  "mongodb+srv://Igor:Gross37038263@cluster0.ohos347.mongodb.net/my-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Succes987");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
