const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactRouter } = require("./routes/api/contacts");
const { authRouter } = require("./routes/api/auth");
const { userRouter } = require("./routes/api/user");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use((err, req, res) => {
  console.error("handling errors", err.message, err.email);
  if (err.name === "ValidationError") {
    res.status(err.status).json({
      message: err.message,
    });
  }
});

app.use((err, req, res) => {
  if (err.status) {
    res.status(err.status).json({ message: err.status });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = {
  app,
};
