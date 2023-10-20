import express from "express";
import cors from "cors";
import logger from "morgan";
import contactsRouter from "./routes/api/contacts.js";
import "dotenv/config";
import {
  handleNotFound,
  handleBadRequest,
  handleInternalServerError,
} from "./middlewares/errorHandler.js";
import authRouter from "./routes/api/auth-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use(handleNotFound);
app.use(handleBadRequest);
app.use(handleInternalServerError);

export default app;