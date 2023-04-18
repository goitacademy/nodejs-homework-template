const mongoose = require("mongoose");

const app = require("./src/app");

// uxni25zjuqy9jaqQ

const DB_HOST =
  "mongodb+srv://sofiagakalo1:uxni25zjuqy9jaqQ@cluster0.6uoxn5p.mongodb.net/my-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
