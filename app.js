// 7Q!c_Ga7xwUXX_b
// mongodb+srv://Nadiia:7Q!c_Ga7xwUXX_b@cluster0.mrrli.mongodb.net/test
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// const DB_HOST = "mongodb+srv://Nadiia:7Q!c_Ga7xwUXX_b@cluster0.mrrli.mongodb.net/db-contacts?retryWrites=true&w=majority"

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "err.message" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
