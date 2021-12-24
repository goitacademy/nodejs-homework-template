const mongoose = require("mongoose");

const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

//
// const DB_HOST =
//   "mongodb+srv://Anna:asarf32@cluster0.jr9ga.mongodb.net/db-contacts?retryWrites=true&w=majority";
//
