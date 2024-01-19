import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { router as contactRoutes } from "./routes/api/contacts.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

const connection = mongoose.connect(process.env.DB_URL, {
  dbName: "db-contacts",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.use("/api", contactRoutes);

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
