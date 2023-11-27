const express = require("express");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts"); // Ruta corregida al módulo

const app = express();

app.use("./api/contacts", contactsRouter); // Ruta corregida al módulo

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
