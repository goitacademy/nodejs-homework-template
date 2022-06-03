const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger(process.env.NODE_ENV === "dev" ? "dev" : "short"));

app.use("/api/v1/contacts", contactsRouter);

app.use((req, res) => {
  console.log("middleware1");
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("common errors");
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
