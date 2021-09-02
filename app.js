const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const api = require("./api");

const app = express();

// Обработчик тела запроса в формате json
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", api.auth);
app.use("/api/v1/contacts", api.contacts);

// Processing of non-existant requests
app.use((_, res) => {
  res.status(404).send({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

// Processing of mistakes
app.use((error, _, res, __) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({
    status: "error",
    code: status,
    error,
  });
});

// Connecting to the DB
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(async () => {
    // app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => console.log(error));

module.exports = app;
