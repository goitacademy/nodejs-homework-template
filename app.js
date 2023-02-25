const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const { DB_HOST, PORT = 3000 } = process.env;

const contactsRouter = require("./routes/api/contacts");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message: err.message });
// });

module.exports = app;
