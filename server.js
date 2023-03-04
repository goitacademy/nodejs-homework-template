const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Slava:O2OZZX4wBjQy2n2S@cluster0.pmj6ulj.mongodb.net/db_contacts?retryWrites=true&w=majority";

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
