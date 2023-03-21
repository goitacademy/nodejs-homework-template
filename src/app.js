const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const usersRouter = require("./routes/api/users");
const { auth } = require("./middlewares");
const contactsRouter = require("./routes/api");
require("./config/config-passport");
const { errorHandler } = require("./helpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/contacts", auth, contactsRouter);

app.use(errorHandler);

module.exports = app;
