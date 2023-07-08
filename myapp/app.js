const express = require("express");

const contacts = require("../models/contacts.json");
const app = express();

// app.get("/", (req, res) => {
//   res.send("<h2>Home page</h2>>");
// });

// app.get("/contacts", (req, res) => {
//   res.send("<h2>Contacts page</h2>");
// });

app.get("/contacts", (req, res) => {
  res.send(contacts);
});

app.listen(3000);
