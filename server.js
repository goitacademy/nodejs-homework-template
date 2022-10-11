const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://usermax32:wbin270390@cluster0.0i6w7au.mongodb.net/db-contacts?retryWrites=true&w=majority";

const PORT = 3000;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
