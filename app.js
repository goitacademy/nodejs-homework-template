import logger from "morgan";
import cors from "cors";

import contactsRouter from "./routes/api/contacts.js";
import express from "express";
import {
  handleNotFound,
  handleBadRequest,
  handleInternalServerError,
} from "./middleware/errorHandler.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use(handleNotFound);
app.use(handleBadRequest);
app.use(handleInternalServerError);

module.exports = app;
