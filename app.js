const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server running. Use our API on port: ${PORT}`))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

module.exports = app;
