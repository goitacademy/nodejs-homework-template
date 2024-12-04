const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const allRouter = require("./routes/allRouter");
const app = express();
const JWTStrategy = require("./JWT/configJWT");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

JWTStrategy();

app.use("/api", allRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
});

module.exports = app;
