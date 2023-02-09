const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const contactsRouter = require("./src/routes/api/contacts");
const router = require("./src/routes/api/auth");
const app = express();
const jwt = require("jsonwebtoken");

// const bcrypt = require("bcryptjs");

mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.bjfqkyj.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connection successful");
  });

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/user", router);

app.use((err, req, res, next) => {
  if (err?.error?.isJoi) {
    return res
      .status(400)
      .json({
      status: "failure",
      message: err.error.toString,
    });
  }
  if (err?.code === 11000) {
    return res
      .status(409)
      .json({ status: "failure", message: "Duplicate key error" });
  }
  if (err) {
    return res
      .status(500)
      .json({ status: "failure", message: err.message });
  }
  res
    .status(404)
    .json({ status: "failure", message: "Endpoint not found" });
});

const data = {
  id: 10,
  email: "test@gmail.com",
};

const SECRET = `${process.env.SECRET_JWT}`;
const token = jwt.sign(data, SECRET, { expiresIn: "1h" });
console.log("token", token);

const decoded = jwt.decode(token);
console.log("decoded", decoded);

try {
  const result = jwt.verify(token, SECRET);
  console.log("result", result);
} catch (error) {
  console.log("error", error);
}

module.exports = app;
