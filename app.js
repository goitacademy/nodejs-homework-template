const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/authRouter");

const {
  noDataByIdError,
  duplicateError,
  serverError,
} = require("./helpers/errorHandlers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  if (err.message.includes("Cast to ObjectId failed")) {
    return noDataByIdError(res);
  }

  if (err.message.includes("duplicate")) {
    return duplicateError(res);
  }

  serverError(err, res);
});

module.exports = app;
