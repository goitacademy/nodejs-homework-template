const express = require("express");
const app = express();

const logger = require("morgan");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const routerApi = require("./api");
app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Connection error",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
const uriDb = process.env.URI_DB;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful')
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
