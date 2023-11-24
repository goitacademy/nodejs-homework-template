const express = require("express");
const logger = require("morgan");
require("./db");
const path = require("node:path");
// require("dotenv").config();
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));

app.use(routes);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
