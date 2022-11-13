const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use("/", (req, res) => {
  res.status(404).json({message: "Not found"});
});

app.use((err, req, res, next) => {
  console.error(`app error: ${err.message}, ${err.name}`);

  //
  // так мы делали на занятии
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  //
  //

  res.status(500).json({
    status: "fail",
    code: 500,
    data: "Internal Server Error",
  });
});

module.exports = app;
