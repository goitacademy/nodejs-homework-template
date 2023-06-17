const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const routerApi = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
require("./config/config-passport");
app.use(express.json());

app.use("/api", routerApi);

app.use((req, res) => {
  res.status(404).json({ message: "Not found 2 tutaj" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
