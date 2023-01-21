require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const { connectMongo } = require("./db/connection");
const { errorHandler } = require("./helpers/apiHelpers");
const contactsRouter = require("./routers/contactsRouter");
const authRouter = require("./routers/authRouter");
const filesRouter = require("./routers/filesRouter");

const PORT = process.env.PORT || 3000;
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users/avatars", filesRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();
    app.listen(PORT, (err) => {
      if (err) console.error("Error at a server launch:", err);
      console.log(`Server works at port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch app with error ${err.message}`);
  }
};

start();
