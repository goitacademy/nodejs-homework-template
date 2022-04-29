const app = require('./app');
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));

app.listen(PORT, (err) => {
  if (err) console.error("Error at aserver launch:", err);
  console.log(`Server running. Use our API on port: ${PORT}`);
});
