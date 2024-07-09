const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
require("./middleware/auth");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts or /api/users",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message || "Internal Server Error",
    data: "Internal Server Error",
  });
});

module.exports = app;
