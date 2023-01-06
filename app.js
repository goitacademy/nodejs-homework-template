// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");

// const contactsRouter = require("./routes/api/contacts");

// const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   if (err.status)
//     res.status(err.status).json({
//       message: err.message,
//     });

//   res.status(500).json({ message: "Internal server error" });
// });

// module.exports = app;

const DB_HOST =
  "mongodb+srv://Viktoriya:1111@cluster0.nszzwat.mongodb.net/db-contacts?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose
  .connect(DB_HOST)
  .then(() => console.log("bjkhbkjh"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
