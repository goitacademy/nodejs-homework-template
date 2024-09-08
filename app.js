const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const {setJWTStrategy} = require('./config/jwt');

const contacts = require("./routes/api/contacts.js");
const auth = require('./routes/api/auth.js');

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

setJWTStrategy();

app.use("/api/contacts", contacts);
app.use('/api/auth', auth);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;