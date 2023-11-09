// const app = require('./app')

const express = require("express");

const app = express();

app.get("/", (reg, res) => {
  console.log({ method: reg.method, url: reg.url });
  res.send("Home");
});

app.listen(8080, () => {
  console.log("Server Server running. Use our API on port: 8080");
});
