const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./src/routes/api/contacts");
const usersRouter = require("./src/routes/api/auth");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hpoeewd.mongodb.net/db-contacts`;

mongoose
  .connect(url)
  .then(() => {
    console.log("Database connection successful");
  })
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
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
