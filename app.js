import cors from "cors";
import logger from "morgan";
import express from "express";

import authRouter from "./modules/auth/routes/auth.js";
import userRouter from "./modules/users/routes/users.js";
import contactsRouter from "./modules/contacts/routes/contacts.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
