const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.get("/", (_, res) => {
  res.send("Welcome to my app");
});

app.use((_, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, _, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
