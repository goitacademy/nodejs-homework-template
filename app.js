import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import contactsRouter from "./routes/api/contactsRouter.js";
import authRouter from "./routes/api/auth/authRouter.js";

export const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("err:", err.message);
  res.status(err.status).json({ message: err.message });
});
