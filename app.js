import express from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts.js";
import usersRouter from "./routes/api/users.js";
import { noFound } from "./controllers/errors/noFound.js";
import { errorMessage } from "./controllers/errors/errorMessage.js";
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);
app.use(noFound);
app.use(errorMessage);

export default app;
