const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const auth = require("./middlewares/auth");
const { authRouter } = require("./routes/api/auth");
const { contactsRouter } = require("./routes/api/contacts");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use("/user", authRouter);
app.use("/api/contacts", auth, contactsRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not  found Way" });
});

module.exports = app;
