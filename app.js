const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/api/authorization");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, request, response, next) => {
  const { status = 500, message = "Server error" } = error;
  response.status(status).json({ message });
});

module.exports = app;
