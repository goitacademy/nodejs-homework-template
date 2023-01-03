const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactsRouter } = require("./routes/api/contacts");
// const { router } = require("./routes/api/contacts");
const { tryCatchWrapper } = require("./helpers/index");
// const morgan = require("morgan");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.get("/api/error/", (req, res) => {
  throw new Error("Something bed happened!");
});

app.get("/api/error2/", async (req, res, next) => {
  try {
    throw new Error("Something bad happened in async function!");
  } catch (error) {
    next(error);
  }
});

app.get(
  "/api/error3",
  tryCatchWrapper(async (req, res, next) => {
    throw new Error("Something bad happened in async function!!");
  })
);

app.use("/api/contacts", contactsRouter);

// app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
