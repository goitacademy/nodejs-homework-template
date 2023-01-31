const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// console.log(process.env);

const app = express();
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.uum8ffo.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Database connection successful"))
  .catch(() => {
    console.log("Database connection failed");
    process.exit(1);
  });
app.use(express.static("public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
