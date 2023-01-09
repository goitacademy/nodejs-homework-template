const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const { authenticate } = require("./middlewars");

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/contacts", authenticate, contactsRouter);
app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
