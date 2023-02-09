const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const { listContacts } = require("./models/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use("/api/contacts", contactsRouter); ORIGINAL
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/", (res, req, next) => {
//   res.status(200).json({ message: "its working" });
// });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
