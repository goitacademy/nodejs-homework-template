const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());

const contactsRouter = require("./routes/api/contacts");
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
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

const PORT = process.env.PORT || 3000;
const { DB_HOST: uriDb } = process.env;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Server running. Access API here ► http://localhost:${PORT}/`
      );
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  });
