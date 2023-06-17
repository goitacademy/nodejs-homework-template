// Rlm4NMZk1cKgYSDa
// const mongoose = require("mongoose");
// const DB_HOST =
//   "mongodb+srv://OlhaMunaieva:Rlm4NMZk1cKgYSDa@cluster0.i4fxsxn.mongodb.net/db-contacts?retryWrites=true&w=majority";
// mongoose.set("strictQuery", true);

// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("hi"))
//   .catch((error) => console.log(error.message));

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
// const { error } = require("./schemes/contacts");

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
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
