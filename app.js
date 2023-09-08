import dotenv from "dotenv";
import express from "express";
import { dbConnect, dbDisConnect } from "./db.js";
import logger from "morgan";
import cors from "cors";
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

  app.use("/contacts", contactsRouter);
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
