const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const contactsRouter = require("./routes/api/contacts");
app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    data: "Internal Server Error",
  });
});

const uriDb = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful.");
    app.listen(PORT, () => {
      console.log(`Express server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error.");
    console.log(`Error message: ${err.message}`);
    process.exit(1);
  });
