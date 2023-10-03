import mongoose from "mongoose";

import app from "./app.js";

const DB_HOST =
  "mongodb+srv://AloBordo:LjLmy5vQnyVWqXGI@cluster0.4ywplyx.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.mongoose);
    process.exit(1);
  });
