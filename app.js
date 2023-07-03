const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();


// const contactsRouter = require("./routes/api/contacts");



const app = express();


const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.listen(3001);

// app.use("/api/contacts", contactsRouter);

app.use(async (req, res) => {
  const { method, url } = req;

  await console.log(method, url);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});





module.exports = app;
