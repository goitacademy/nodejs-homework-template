const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const path = require("path");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/contacts", contactsRouter);
app.use("/users", usersRouter);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
