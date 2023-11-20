// const app = require('./app')
import mongoose from "mongoose";
import app from "./app.js";

const DB_HOST =
  "mongodb+srv://Oleksandr:ai4485vm@cluster0.nvgnpmu.mongodb.net/db-contacts?retryWrites=true&w=majority";
// Підключаємось до кластера обовязково вказати між /назву бази? а також пароль
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
