const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const path = require("path");


const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("./auth/config/config-passport");


app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));


app.use("/contacts", contactsRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
