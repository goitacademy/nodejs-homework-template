const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/authRouter");

const { errorHandler } = require("./helpers/apiHelper");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use(errorHandler);

app.use((err, req, res) => {
  res.status(404).json({ err: err.message, message: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ err: err.message, message: "Check CRUD method" });
});

module.exports = app;
