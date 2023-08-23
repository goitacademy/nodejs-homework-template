import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import contactsRouter from "./routes/api/contacts.js";
import app from "./app.js";
dotenv.config();

const dbURL = process.env.DB_URL;
const serverPort = process.env.SERVER_PORT || 3000;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");

    app.listen(serverPort, () => {
      console.log(`Server is running on port ${serverPort}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
