// app.js
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const notFoundMiddleware = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const { apiSpecification } = require("./utils/swagger");
const swaggerUI = require("swagger-ui-express");
// const path = require("path");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

// Document
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(apiSpecification));

// rout 200 api
// app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));
app.use(express.static("public"));

app.use("/", routes());

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

module.exports = {
  app,
};
