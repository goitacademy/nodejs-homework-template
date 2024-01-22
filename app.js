import mongoose from "mongoose";
import express from "express";
import passport from "./config/passport.js";
import {router as authRoutes} from "./routes/api/auth.routes.js";
import { router as contactRoutes } from "./routes/api/contacts.routes.js";


import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

const connection = mongoose.connect(process.env.DB_URL, {
  dbName: "db-contacts",
});

app.use(express.json());
app.use(passport.initialize());
app.use("/api", contactRoutes);
app.use("/api/auth", authRoutes);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`App listens on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error while establishing connection: [${error}]`);
    process.exit(1);
  });
