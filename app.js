import express from "express";
import logger from "morgan";
import cors from "cors";
import { router as contactsRouter } from "./routes/api/contacts.js";
import { ERROR_TYPE } from "./constant.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.message === ERROR_TYPE.CONTACT_TAKEN) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
});

export { app };
