// const app = require('../app')

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const contactsRouter = require("../routes/api/contacts/contacts");
const userRouter = require("../routes/api/users/Router")

dotenv.config();

const PORT = process.env.PORT || 3000;

class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initConfig();
    this.initMiddlewares();
    await this.initDatabase();
    this.initRoutes();
    this.initErrorHandling();
    this.listen();
  }
  initServer() {
    this.server = express();
  }
  initConfig() {
    dotenv.config({ path: path.join(__dirname, "../.env") });
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "*" }));
    this.server.use(logger("dev"));
    this.server.use("/avatars", express.static('public/avatars'))
  }
  async initDatabase() {
    try { 
      const { MONGODB_URI } = process.env;
      await mongoose.connect(MONGODB_URI, {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
      console.log("Database connection successful");
    } catch (err) {
      process.exit(1);
    }
  }
  initRoutes() {
    this.server.use("/api/contacts", contactsRouter);
    this.server.use("/", userRouter)
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
new Server().start();
