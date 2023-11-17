import app from "./app.js";
import mongoose from "mongoose";

//tXqh9e02unoMColZ

const DB_HOST="mongodb+srv://Kate:tXqh9e02unoMColZ@cluster0.a4kfnzb.mongodb.net/My-Contacts?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000")
})
  })
  .catch(error => { 
    process.exit(1);
    console.log(error.message);
  })



