import mongoose from "mongoose";
import app from "./app.js";

const DB_HOST =
  "mongodb+srv://proniman:yn6QxbyWm8PP8xQ@cluster0.vmc8vco.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
