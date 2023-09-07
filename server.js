import mongoose from "mongoose";
import app from "./app.js";
import { error } from "console";

// const DB_HOST =
//   "mongodb+srv://sonofra:e0pXN29alzLqVc6o@clusterhw.lbm4s15.mongodb.net/my-contacts?retryWrites=true&w=majority";

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
