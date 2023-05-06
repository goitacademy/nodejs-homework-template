const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { authRouter, contactsRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, response) => {
  response.status(404).json({ message: "Not found" });
});

app.use((erro, _, response, __) => {
  const { status = 500, message = "Server error. Please try later on" } = erro;
  response.status(status).json({ message });
});

module.exports = app;
