const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://SashaSolo:SmR00Blk20fB3ZDt@clusterhw.agxresp.mongodb.net/contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
