const express = require("express");
const logger = require("morgan");
const cors = require("cors");
//TODO get away folder api
const { authRouter } = require("./routes/api/auth");
const { userRouter } = require("./routes/api/user");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // tell express to work with JSON in body

// routes
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// error handling
app.use((err, req, res, next) => {
  console.error("Handling errors: ", err.message, err.name);

  // handle mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // handle ObjectId validation
  if (err.message.includes("Cast to ObjectId failed for value")) {
    return res.status(400).json({ message: "id is invalid" });
  }

  res.status(500).json({ message: err.message });
});

module.exports = app;
