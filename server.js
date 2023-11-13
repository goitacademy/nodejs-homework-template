const app = require('./app');

// const express = require("express");

// const app = express();

// app.get("/", (req, res) => {
//   console.log({ method: req.method, url: req.url });
//   res.send("Home page");
  
// });

app.listen(8080, () => {
  console.log("Server running. Use our API on port: 8080");
});
