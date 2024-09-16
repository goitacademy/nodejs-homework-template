const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./api/contactsView");
const connection = require("./db/connection");

require("dotenv").config();
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
    data: "No found",
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;

connection
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Server running. Use our API on port : ${PORT}`
      );
    })
  )
  .catch((error) => {
    console.log(`Server not running. 
Eror message: ${error.message}`);
    process.exit(1);
  });

module.exports = app;