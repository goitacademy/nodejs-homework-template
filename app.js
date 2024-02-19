import cors from "cors";
import logger from "morgan";
import express from "express";

import { router as contactsRouter } from "./routes/api/contacts.js";

import { router as usersRouter } from "./routes/api/users.js";

import setJWTStrategy from "./config/userAuthStrategy.js";
import authMiddleware from "./auth.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

setJWTStrategy();

app.use("/api/contacts", authMiddleware, contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

export { app };
