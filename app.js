const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contactsRout");
const { userRouter, authRout, contactsRout } = require("./routes/api");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("dotenv").config();

app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRout);
//========================mongo========================================
mongoose.connect(process.env.MONGODB_URL).then(() => {
  try {
    console.log("mongo db connection");
  } catch (error) {
    process.exit(1);
    console.log(error);
  }
});
//================================================================

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
