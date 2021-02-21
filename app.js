const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
