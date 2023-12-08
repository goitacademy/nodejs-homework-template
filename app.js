const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/contacts", contactsRouter);
app.use("/users", usersRouter);

module.exports = app;
