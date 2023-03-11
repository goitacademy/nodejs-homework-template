const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");
const { errorHandler } = require("./helpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger), cors(), express.json());
app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use(errorHandler);

module.exports = app;
