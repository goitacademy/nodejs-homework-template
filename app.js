const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/api/auth");
const usersRoutes = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const dbUrl =
  "mongodb+srv://agnieszkaiwan:zz4sRuRHDKCpYYVM@cluster0.squxa5s.mongodb.net/db-contacts";

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
