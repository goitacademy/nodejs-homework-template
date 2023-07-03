const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://CuzImBatman:xpvNGJnyeMDGzVwg@cluster0.vosysd9.mongodb.net/db-contacts?retryWrites=true&w=majority";
// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("Database connection successful"))
//   .catch((error) => console.log(error.message));

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);

    console.log("Database connection successful");

  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
