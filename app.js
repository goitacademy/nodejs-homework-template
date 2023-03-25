import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { contactsRouter } from "./routes/api/index.js";
import { authRouter } from "./routes/api/index.js";
import path from "path";

const app = express();

dotenv.config();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
;


export default app;
