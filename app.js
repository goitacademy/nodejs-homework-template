const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");
const app = express();
dotenv.config({ path: "./dev.env" });
const formatsLogger =
  app.get("env") === "development"
    ? "dev"
    : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then((con) => {
    console.log("Mongo DB succesfully connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
app.use("/api/contacts", contactsRouter);
app.use(logger(formatsLogger));
app.use(cors());
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
