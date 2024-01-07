import mongoose from "mongoose";

import app from "./app.js";
// aXj8aRiLhNDYQFUU
const DB_HOST = "mongodb+srv://Pavlo00600:aXj8aRiLhNDYQFUU@db-contacts.gs8hryf.mongodb.net/db-contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })


