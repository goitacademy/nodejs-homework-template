const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contacts } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contacts);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: "404",
    message: "Not found",
  });
});

app.use((err, _, res, __) => {
  const { code = 500, message = "Server error" } = err;
  res.status(code).json({
    status: "error",
    code,
    message,
  });
});

module.exports = app;
