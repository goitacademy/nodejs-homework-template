const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs").promises;
// const multer = require("multer");
// const path = require("path");

require("dotenv").config();

//  const MongoClient = require("mongodb").MongoClient;
const { errorHandler } = require("./helpers/apiHelpers");

const contactRouter = require("./routes/api/contactsRoutes");
const authRouter = require("./routes/api/authRoutes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD:MM:YYYY_hh:mm:ss");
  await fs.appendFile("./public/server.log", `\n ${method} ${url} ${date}`);
  next();
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactRouter);
app.use("/api/users", authRouter);
app.use(errorHandler);
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
