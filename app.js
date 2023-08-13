const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

// const DB_HOST =
//   "mongodb+srv://Alinavr:mRBrkOHzta1Ld0f7@cluster0.ek3mzyj.mongodb.net/db-contacts?retryWrites=true&w=majority";

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

// mRBrkOHzta1Ld0f7
