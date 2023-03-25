const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
console.log(process.env.DB_HOST);
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);

    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectToMongoDB();

app.use("/api/contacts", contactsRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status } = err;
  res.status(status || 500).json({ message: err.message });
  next();
});

module.exports = app;
