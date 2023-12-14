const express = require("express");
// const uuid = require("uuid").v4;
const logger = require("morgan");
const cors = require("cors");
// const fs = require("fs").promises;
 
const contactsRouter = require("./routes/api/contacts");


// const mongoose = require('mongoose');
// const DB_HOST =
//   "mongodb+srv://Maryna:ifyvOFOOpxcCKNcu@cluster0.sb6iuxx.mongodb.net/db-contacts?retryWrites=true&w=majority";

// mongoose.connect(DB_HOST)
//   .then(() => console.log("Database connection successful"))
// .catch(error => console.log(error.message))

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
  
});


module.exports = app;
