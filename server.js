const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const routerApi = require("./api");
app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
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
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  // useUnifiedTopology: true,
  // useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Server running. Use our API on port: ${PORT}, "Database connection successful"`
      );
      console.log(connection.then())
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  });
