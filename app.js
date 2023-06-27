const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const routerApi = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());

require("./config/config-passport");

app.use(express.static("public"));

app.use(express.json());

app.use("/api", routerApi);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

module.exports = app;
