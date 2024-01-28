require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { connectToDatabase } = require("./config/connectToDatabase");

connectToDatabase();

const contactsRoute = require("./routes/api/contactsRoute");
const authRoute = require("./routes/api/authRoute");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/users", authRoute);
app.use("/api/contacts", contactsRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
