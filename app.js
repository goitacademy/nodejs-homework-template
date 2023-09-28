const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { PORT } = process.env;

const contactsRouter = require("./routes/api/contacts-router");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

//  Error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
  next();
});

app.use((err, req, res) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => console.log(`Server running at 3000 port`));

module.exports = app;
