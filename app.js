const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("err:    ", err.message);
  console.log(err.name);

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.message.includes("Cast to ObjectId failed for value")) {
    res.status(400).json({ message: "Indalid Id" });
  }

  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
