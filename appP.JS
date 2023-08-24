const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Yura:BctxmeAsuME7PXvF@cluster0.hdby2aq.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect success"))
  .catch((error) => console.log(error.message));
