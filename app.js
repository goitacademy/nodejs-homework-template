const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./src/routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", contactsRouter);

app.use((req, res) => {
  console.log("Not found");
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("status 500");
  res.status(500).json({ message: err.message });
});

module.exports = app;
