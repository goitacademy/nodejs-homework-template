const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const configPassport = require("./config/config-passport");
const uploadFunctions = require("./config/config-multer");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(passport.initialize());

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

app.use(contactsRouter);
app.use(usersRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((err, _, res, __) => {
  res.status(500).json({
    status: "failure",
    code: 500,
    message: err.message,
  });
});

const uriDb = process.env.DB_HOST;

const startServer = async () => {
  try {
    await uploadFunctions.initUploadFolders();
    await mongoose.connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "db-contacts",
    });
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
  }
};

startServer();

module.exports = app;
