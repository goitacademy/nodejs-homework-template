import app from "./app.js";
import mongoose from "mongoose";

const DB_HOST  = "mongodb+srv://Marino3ka:M6ALuKQFWiEyWk22@cluster0.kzuvocw.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Server running. `)
    app.listen(3000);
    console.log("Database connection successful")
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


