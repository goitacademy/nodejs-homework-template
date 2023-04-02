const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { connectDatabase } = require("./startup/database.js");
connectDatabase();

const contactsRouter = require("./routes/api/routes.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
