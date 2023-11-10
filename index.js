const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const routerContacts = require("./routes/contacts");
const routerUsers = require("./routes/users");

const { DB_HOST: uriDb } = process.env;

const connection = mongoose.connect(uriDb);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routerContacts);
app.use("/users", routerUsers);

app.use((req, res) => {
  res.status(404).json({ message: `Woops - ${req.path}` });
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
});

async function startServer() {
  try {
    await connection;
    console.log("Database connection successful");
    app.listen(3000, function () {
      console.log("API listening");
    });
  } catch (err) {
    console.log("DB not connected, shutting down");
    process.exit(1);
  }
}

startServer();
