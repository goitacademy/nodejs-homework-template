import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";

import { router as contactsRouter } from "./routes/api/contacts.js";
import usersRouter from "./routes/api/users.js"
import setJWTStrategy from "./config/jwt.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

setJWTStrategy()

app.use("/", contactsRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };  
