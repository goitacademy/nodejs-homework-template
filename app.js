const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/contacts");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

mongoose.connect(
  "mongodb+srv://warlenromero:AzOXVQJkVQuTCQ56@basegoit.1wn7yh4.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
