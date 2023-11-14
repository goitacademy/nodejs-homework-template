const express = require("express");
const logger = require("morgan");
require("./db");
// require("dotenv").config();
// const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use("/api", routes);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
// app.use(cors());
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
