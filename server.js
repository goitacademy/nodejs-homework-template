import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const { DB_HOST, PORT } = process.env;
// console.log(process.env);
// const DB_HOST =
//   "mongodb+srv://romankol1223:k7xfpy8QW5i7yJUo@cluster0.dudqzwl.mongodb.net/db-contacts?retryWrites=true&w=majority";
// k7xfpy8QW5i7yJUo пароль
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
