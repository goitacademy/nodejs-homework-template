const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // res.status(500).json({ message: err.message })
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;

// mongodb+srv://yuragms:<8DMDjaeKyTh9NR8>@cluster0.yg8ew.mongodb.net/test
