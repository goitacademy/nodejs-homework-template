import express from "express";
import logger from "morgan";
import cors from "cors";
import 'dotenv/config';
import { router } from "./routes/api/contacts.js";
import mongoose from "mongoose";
export const app = express();

const connection = mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log('Database connection successful');
})
.catch((error) => {
  console.error('Error connecting to database:', error);
  process.exit(1);
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
