require("./server");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/users");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.get('/public', express.static('public'));

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
module.exports = app;
