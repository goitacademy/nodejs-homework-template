import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts.js";
import usersRouter from "./routes/api/authRouter.js";
import jwtStrategy from "./config/jwt.js";
import listRouter from "./routes/api/listRouter.js";
import "colors";

dotenv.config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(cookieParser());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

jwtStrategy();

app.use("/api", contactsRouter);
app.use("/api", usersRouter);
app.use("/api", listRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

export default app;
