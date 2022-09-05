const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./config/config-passport");
require("dotenv").config();

const app = express();

// parse application/json
app.use(express.json());
// cors
app.use(cors());
app.use(express.static("public"));

const routerApi = require("./api");
app.use("/api", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use right api on routes",
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
const urlDb = process.env.DB_SRV;

const connection = mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connectDB();
connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
