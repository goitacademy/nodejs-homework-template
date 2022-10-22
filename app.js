const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const handleCatchErrors = require("./middlewares/errorHandler");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use(
  handleCatchErrors((req, res, next) => {
    next(createError(404));
  })
);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

module.exports = app;