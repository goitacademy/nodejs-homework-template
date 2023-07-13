const express = require("express");
// const app = require("./app");

const app = express();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

//@ GET /api/contacts
app.get("/ping", (req, res) => {
  res.send("HELLO");
});
//@ GET /api/contacts/:id

//@ POST /api/contacts

//@ DELETE /api/contacts/:id

//@ PUT /api/contacts/:id
