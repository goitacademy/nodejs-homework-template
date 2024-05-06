const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();
console.log(process.env.MAILGUN_API_KEY)

const userRoutes = require("./routes/users");
const contactsRouter = require("./routes/contacts");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://alicjaxpoltorak:master3@cluster0.zaf91zr.mongodb.net/";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.error("Database connection error", err);
    process.exit(1);
  });

app.use("/users", userRoutes);
app.use("/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});



module.exports = app;
