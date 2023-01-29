const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const { contactsRouter } = require("./src/routers/contactsRouter");
const { errorHandler } = require("./src/helpers/apiHelpers");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found " });
});

app.use(errorHandler);

module.exports = {
  app,
};
