import dotenv from "dotenv";
import express from "express";
import { dbConnect, dbDisConnect } from "./db.js";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { contactsRouter } from "./contacts/contacts.route.js";

dotenv.config();

const port = process.env.PORT ?? 3000;
const app = express();

const initializeApp = async () => {
  await dbConnect();

  const formatsLogger = app.get("env") === "development" ? "dev" : "short";

  app.use(logger(formatsLogger));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use("/contacts", contactsRouter);

  app.use(function (req, res, next) {
    res.status(404).send("Nie znaleziono strony!");
  });

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500).json({ error: 'Wystąpił błąd!' });
});

  app.listen(port, () => {
    console.log("Server is listening on port", port);
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
