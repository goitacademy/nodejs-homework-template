const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const authRouter = require("./routes/api/auth");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/users", authRouter);
app.use("/avatars", express.static("public/avatars"));

const contactsRouter = require("./routes/api/contacts");
app.use("/api/contacts", contactsRouter);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, data: "Internal Server Error" });
});

module.exports = app;
