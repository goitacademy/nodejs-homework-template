// ========NPM MODULES======== //
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// ========USER MODULES======== //
const contactsRouter = require("./routes/contactsRoutes");
const usersRouter = require("./routes/usersRoutes");

// ========EXPRESS APPLICATION======== //
const app = express();

// ========ENVIROMENT======== //
const envPath =
  process.env.NODE_ENV === "production"
    ? "./enviroments/production.env"
    : "./enviroments/development.env";

dotenv.config({ path: envPath });

// ========MONGO DB CONNECTOIN======== //
mongoose
  .connect(process.env.MONGO_URL)
  .then((con) => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// ========MIDDLEWARES======== //
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ========ROUTES======== //
app.use("/users", usersRouter);
app.use("/api/contacts", contactsRouter);

// ========NOT FOUND ERROR======== //
// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

/**
 * Not found request handler.
 */
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Oops! Resource not found..",
  });
});

// ========SERVER ERROR======== //
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
