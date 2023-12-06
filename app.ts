import express from "express";
import logger from "morgan";
import cors from "cors";

import authRouter from "./routes/api/authRouter";
import userRouter from "./routes/api/userRouter";
import contactsRouter from "./routes/api/contactsRouter";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

export default app;
