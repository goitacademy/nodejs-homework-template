const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Volodya:s8VCw26H4e9LczkR@cluster0.vobxqw4.mongodb.net/db-contacts";
mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((er) => {
    console.log(er.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Database connection successful");
// });
