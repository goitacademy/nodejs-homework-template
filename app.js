const express = require("express");
const { contactsRouter } = require("./routes/contactsRouter");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");

const app = express();

app.use(express.json());

app.use("/contacts", contactsRouter);

app.use(globalErrorHandler);

module.exports = app;
