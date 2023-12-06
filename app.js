const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

module.exports = app;
