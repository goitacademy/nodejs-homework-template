import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
// const fs = require("fs/promises");
// const moment = require("moment");

import contactsRouter from "./routes/api/contacts-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

app.use("/api/contacts", contactsRouter);
// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format("DD-MM-YYYY_hh:mm:ss");
//   await fs.appendFile("./server.log", `\n${method} ${url} ${date}`);
//   next();
// });
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
