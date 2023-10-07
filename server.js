import express from "express";
import mongoose from "mongoose";
import app from "./app.js";
const { DB_HOST, PORT = 3000 } = process.env;
//const DB_HOST = "mongodb+srv://dobritsavlad:NvTtEFyyhdxlEcBw@vldcluster.6owvvjk.mongodb.net/ContactsDB?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
