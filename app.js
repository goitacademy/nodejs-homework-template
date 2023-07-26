const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", require("./api/contacts"));
app.use("/api/users", require("./api/users"));

app.use(
  "/avatars",
  express.static(path.join(process.cwd(), "public", "avatars"))
);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message, status: error.status });
});

module.exports = app;