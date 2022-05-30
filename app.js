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

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// GLVdLWSAZWCaRna0

// GLVdLWSAZWCaRna0

// GLVdLWSAZWCaRna0

// mongodb+srv://MykolaVeres:GLVdLWSAZWCaRna0@clustermv.sn43eld.mongodb.net/test

const dotenv = require("dotenv");
dotenv.config();
// const { DB_HOST, PORT = 3000 } = process.env;

// const DB_HOST =
//   "mongodb+srv://MykolaVeres:GLVdLWSAZWCaRna0@clustermv.sn43eld.mongodb.net/db-contacts?retryWrites=true&w=majority";

// const mongoose = require("mongoose");
// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log("Database connected");
//     app.listen(PORT);
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
