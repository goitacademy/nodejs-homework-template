const express = require("express");

const app = express();

app.listen(3001, () => console.log("The server was started on port 3001."));

app.use((req, res, next) => {
  console.log("Our middleware starts now.");
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Main page</h1>");
});

app.get("/contacts", (req, res) => {
  res.send(`<h1>Contact page</h1>`);
});

app.get("/contacts/:id", (req, res) => {
  res.send(`<h1>Contact page</h1> Parameter: ${req.params.id} `);
});

app.get("*", (req, res) => {
  res.send(`<h1>Page ${req.url} not found</h1>`);
  console.log(req);
});
