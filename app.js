import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

import contactsRouter from "./routes/api/contacts-router.js";
import usersRouter from "./routes/api/users-router.js";

// // const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);
// app.use("")
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
});

export default app;
