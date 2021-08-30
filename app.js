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
    message,
  });
});

const { DB_HOST, PORT = 3000 } = process.env;

// Connecting to the DB

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    // app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => console.log(error));

// Hashing of passwords
// const bcrypt = require("bcryptjs");

// const password = "password";

// const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// console.log(hashPassword);

// const result = bcrypt.compareSync(password, hashPassword);
// console.log(result);

// ==================================

// const logger = require("morgan");

// const contactsRouter = require("./routes/api/contacts");

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));

// app.use(express.json());

// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

module.exports = app;
