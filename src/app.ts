import express, { Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config"; //! скорочений запис
import contactsRouter from "./routes/api/contacts-router";
import authRouter from "./routes/api/auth-contacts-router";
import { swaggerDocs } from "./utils/swagger";

export const app = express(); //* web-server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
swaggerDocs(app, "3000");

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Internal Server Error ❌" } = err;
  res.status(status).json({ message });
});
