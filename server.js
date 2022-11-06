const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const indexRouter = require("./routes/api/index");
app.use("/api", indexRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: `Use api on routes:
      /api/signup - registration user { name, email, password }
      /api/login - login user { email, password }
      /api/logout - logout user { id }
      /current - get current user { token }`,
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    data: "Internal Server Error",
  });
});

const { PORT = 3000, DB_HOST: DB_URI } = process.env;

const connection = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful.");
    app.listen(PORT, () => {
      console.log(`Express server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error.");
    console.log(`Error message: ${err.message}`);
    process.exit(1);
  });
