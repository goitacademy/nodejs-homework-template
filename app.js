const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const contactsRouter = require("./routes/api/contacts");

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущений на порту ${port}`);
});

module.exports = app;
