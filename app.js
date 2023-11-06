// app.js
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes");
const notFoundMiddleware = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const port = process.env.PORT || 3000;

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

app.use("/api", contactsRouter());

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

module.exports = {
  app,
  startServer: async () => {
    try {
      await mongoose.connect(process.env.CONNECTION_MONGODB);
      console.log("Database connection successful");
      app.listen(port, () => {
        console.log(`Server running. Use our API on Port:${port}`);
      });
    } catch (error) {
      console.error("Error connecting to the database:", error);
      process.exit(1);
    }
  },
};
