const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactRouter } = require("./routes/contacts-router");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());
app.use("/api/contacts", contactRouter);

module.exports = app;
