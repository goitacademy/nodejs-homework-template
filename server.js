const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { getConfig } = require("./config");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const connectingDB = require("./db/db");
const { authRouter } = require("./auth/auth.controller");
const router = require("./routes/api/contacts");

dotenv.config({ path: path.resolve(__dirname, ".env") });

// Connecting MongoDB;
connectingDB();

class ContactsServer {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initConfig();
    await this.initDatabase();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initConfig() {
    dotenv.config({ path: path.resolve(__dirname, ".env") });
  }

  async initDatabase() {
    await mongoose.connect(getConfig().dbUrl);
  }

  initMiddlewares() {
    this.app.use(express.json({ limit: "500kb" }));
    this.app.use(morgan("common"));
    this.configureCors();
  }

  initRoutes() {
    this.app.use("/users", authRouter);
    this.app.use("/contacts", router);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      res.status(statusCode).send(err.message);
    });
  }

  startListening() {
    const { port } = getConfig();
    this.app.listen(port, () => {
      console.log("Started listening on port", port);
    });
  }

  configureCors() {
    const { allowedCorsOrigin } = getConfig();
    this.app.use(cors({ origin: allowedCorsOrigin }));
  }
}

new ContactsServer().start();

exports.ContactsServer = ContactsServer;
