const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");

const app = express();

mongoose.connect(
  "mongodb://atlas-sql-6513223536ac861bbc72a629-dp67o.a.query.mongodb.net/db-contacts?ssl=true&authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connection successful");
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
