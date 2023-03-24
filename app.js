const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const router = require("./routes/routes");
const { connectDatabase } = require("./startup/database.js");

connectDatabase();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json());
app.use(morgan(formatsLogger));
app.use(router);
app.use(cors());

app.use((req, res) => {
  res.status(404).send("Not found!");
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

module.exports = app;
