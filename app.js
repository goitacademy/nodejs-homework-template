import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts.js";
import userRouter from "./routes/api/auth.js";
import "colors";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());
app.use(json());

app.use("/api/contacts", contactsRouter);
app.use("/users", userRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found!" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Internal Server Error" } = err;

  res.status(status).json({ message });
});

export default app;
