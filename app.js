const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
const contactRouter = require("./contact/contact.routers");

dotenv.config();

const PORT = process.env.PORT || 3030;
const MONGO_URL = process.env.MONGO_URL;

start();

function start() {
  const app = initServer();
  connectMiddlewares(app);
  declareRoutes(app);
  connectToDb();
  initErrorHandling(app);
  listen(app);
}
function initServer() {
  return express();
}

function connectMiddlewares(app) {
  const formatsLogger = app.get("env") === "development" ? "dev" : "short";
  app.use(logger(formatsLogger));
  app.use(cors());
  app.use(express.json());
}

function declareRoutes(app) {
  app.use("/contacts", contactRouter);
}

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
function initErrorHandling(app) {
  app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    return res.status(statusCode).send({
      name: err.name,
      status: statusCode,
      message: err.message,
    });
  });
}

function listen(app) {
  app.listen(PORT, () => {
    console.log("Server is listeting on port", PORT);
  });
}
