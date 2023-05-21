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

app.use(express.static("./public"));

require("./config-passport");

const contactsRouter = require("./routes/api/contacts.js");
app.use("/api/contacts", contactsRouter);
const { router: usersRouter } = require("./routes/api/users.js");
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(process.env.MONGODB_URI);

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );

module.exports = app;