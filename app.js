// const express = require("express");
import express from "express";
// const logger = require("morgan");
import logger from "morgan";
// const cors = require("cors");
import cors from "cors";

// const contactsRouter = require("./routes/api/contacts");
import contactsRouter from "./routes/api/contacts.js";
// const { listContacts } = require("./models/contacts");
import listContacts from "./models/contacts.js";

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
  res.status(500).json({ message: err.message });
});

// module.exports = app;
export default app;
