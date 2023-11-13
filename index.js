require("dotenv").config();

require("./db");

const express = require("express");

const routes = require("./routes");

const app = express();

app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.info("Server status on port 3000");
});


