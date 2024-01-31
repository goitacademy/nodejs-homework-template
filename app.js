const express = require("express");
const logger = require("morgan");
const cors = require("cors");

<<<<<<< Updated upstream
const contactsRouter = require("./contacts/contacts.router");
=======
const { contactsRouter } = require("./contacts/contacts.router");
const { usersRouter } = require("./users/users.router");

>>>>>>> Stashed changes
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

<<<<<<< Updated upstream
// app.use("../model/contacts", contactsRouter);
app.use("/contacts", contactsRouter);
=======
app.use("/api/contacts", contactsRouter);
app.use("/users", usersRouter);

app.use(express.static("public"));
>>>>>>> Stashed changes

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
  console.log("APP.JS NOT FOUND");
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = { app };
