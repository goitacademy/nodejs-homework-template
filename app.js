import dotenv from "dotenv";
import express from "express";
import { dbConnect, dbDisConnect } from "./db.js";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { contactsRouter } from "./routes/contacts.route.js";
import { userRouter } from "./routes/users.route.js";
import fs from "fs";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const tmpFolder = "tmp";

const checkOrCreateTmpFolder = () => {
  if (!fs.existsSync(tmpFolder)) {
    fs.mkdirSync(tmpFolder);
    console.log(`Created ${tmpFolder} folder.`);
  } else {
    console.log(`${tmpFolder} folder already exists.`);
  }
};

const initializeApp = async () => {
  await dbConnect();
  checkOrCreateTmpFolder();

  const formatsLogger = app.get("env") === "development" ? "dev" : "short";

  app.use(logger(formatsLogger));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static("public"));

  app.use("/contacts", contactsRouter);
  app.use("/users", userRouter);

  app.listen(port, () => {
    console.log("Server is listening on port", port);
  });

  app.use(function (_, res) {
    res.status(404).send("Page not found!");
  });

  app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500).json({ error: "An error occurred!" });
  });
};

initializeApp();

const cleanup = async () => {
  await dbDisConnect();
  process.exit();
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

export default app;
