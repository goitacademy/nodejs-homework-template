import app from "./app.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const {DB_HOST, PORT} = process.env;

// const DB_HOST="mongodb+srv://yaroslava354:yacena88@cluster0.bg3v9av.mongodb.net/my-contacts?retryWrites=true&w=majority"

mongoose
.connect(DB_HOST)
.then(()=> {
  app.listen(PORT, () => {
  console.log("Database connection successful")
})
})
.catch((error)=> {console.log(error.message);
  process.exit(1);
})