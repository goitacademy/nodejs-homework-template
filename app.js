import cors from "cors";
import logger from "morgan";
import express from "express";

import { contactsRouter } from "./routes/api/contacts";
import { connectDb } from "./db/connection.js";

const app = express();

connectDb();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
