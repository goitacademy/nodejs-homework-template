const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(400).json({
    status: "error",
    code: 400,
    message: "Bad request",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err.status);
  // you can error out to stderr still, or not; your choice
  console.error(err);

  // body-parser will set this to 400 if the json is in error
  if (err.status === 400)
    return res.status(err.status).json({
      status: "error",
      code: err.status,
      message: "Bad request",
    });

  return next(err); // if it's not a 400, let the default error handling do it.
});

app.use((err, _, res, __) => {
  res.status(500).json({
    status: "error",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
