// const app = require('../app')

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const contactsRouter = require("../routes/api/contacts");

const PORT = process.env.PORT || 3000;
class Server {
  constructor() {
    this.server = null;
  }
  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.listen();
  }
  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "*" }));
    this.server.use(logger("dev"));
  }
  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }
  listen() {
    this.server.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  }
}
//
new Server().start();
