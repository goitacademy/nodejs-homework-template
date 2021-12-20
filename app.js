import express from "express";
import logger from "morgan";
import cors from "cors";

import {
  getRouter,
  getByIdRouter,
  postRouter,
  patchRouter,
  deleteRouter,
} from "./routes/api/index";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //json
app.use(express.urlencoded({ extended: false })); //для отправки форм

app.use("/api/controllersContacts", getRouter);
app.use("/api/controllersContacts", getByIdRouter);
app.use("/api/controllersContacts", postRouter);
app.use("/api/controllersContacts", deleteRouter);
app.use("/api/controllersContacts", patchRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

export default app;
