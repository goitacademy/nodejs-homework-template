const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;
console.log(DB_HOST);

const contactsRouter = require("./routes/api/contacts");

// const DB_HOST =
//   "mongodb+srv://DenisMalniev:JgL0FmmYwZtwluJ3@cluster0.beiyw0s.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Page Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error", statusOperation } = err;
  res.status(status).json({ message, statusOperation });
});

module.exports = app;
