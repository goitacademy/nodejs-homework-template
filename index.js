const express = require("express");

const routes = require("./routes");

require("./db");

const app = express();

app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).send({ message: "Not Found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send({ message: "Internal Server Error" });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

// 