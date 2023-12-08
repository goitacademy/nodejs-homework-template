// app.js
const express = require("express");
// const path = require('path');
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users"); 

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter); 
// app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));
app.use(express.static('public'));

const { DB_URI } = process.env;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
    app.listen(8080, () => {
      console.log("Server running. Use our API on port: 8080");
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  });

module.exports = app;