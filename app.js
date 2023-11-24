const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contactsRoutes");

require("dotenv").config();
require("./db");

// console.log(process.env.DB_URI);

const app = express();

// require("./models/contacts");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// Обробка 404 помилки
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Обробка 500 помилки
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

module.exports = app;
