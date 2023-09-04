const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routerApi = require("./api");

require("dotenv").config();

const app = express();

// parse application/json
app.use(express.json());
// cors
app.use(cors());

require("./config/config-passport");

app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts, api/users",
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
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Database connection successful. Server running. Use Contacts API on port: ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(
      `Connection error. Server not running. Error message: ${err.message}`
    );
    process.exit(1);
  });
