const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/routesAuth");
const contactsRouter = require("./routes/api/routesContacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log(err.code);
  // if (err.code === 11000) {
  //   res.status(409).json({ message });
  // } else {
  //   res.status(status).json({ message });
  // }

  res.status(status).json({ message });
});

module.exports = app;
