import express from "express";
import cors from "cors";
import logger from "morgan";
import "dotenv/config";

import authRouter from "./routes/api/auth-router.js";
import contactsRouter from "./routes/api/contacts-router.js";

const app = express(); // - web-server

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json())


app.use("/users", authRouter);
app.use("/api/contacts/", contactsRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not Found" })
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

export default app;