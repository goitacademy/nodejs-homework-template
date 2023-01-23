const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./helpers/apiHelpers");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const avatarRouter = require("./routes/api/avatars");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("DataBase of Contacts");
});

app.use("/users", usersRouter);

app.use("/api/contacts", contactsRouter);

app.use("/avatars", avatarRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
