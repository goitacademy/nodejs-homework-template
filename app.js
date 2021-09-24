const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const boolParser = require("express-query-boolean");

const { authRouter, contactsRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(boolParser());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, _req, res, _next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    message,
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

module.exports = app;
