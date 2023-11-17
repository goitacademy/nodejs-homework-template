import app from "./app.js";
import mongoose from "mongoose";


const { DB_HOST } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000")
})
  })
  .catch(error => { 
    console.log(error.message);
    process.exit(1);
  })



