const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { connect } = require("mongoose");

require("dotenv").config();

connect(process.env.DB_LINK)
  .then(() => console.log("Succesful connection with database"))
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });

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
  res.status(500).json({ message: err.message });
});

module.exports = app;
