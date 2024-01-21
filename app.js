import express from "express";
import cors from "cors";
import logger from "morgan";
import "dotenv/config";
import path from "path";

import authRouter from "./routes/api/auth-router.js";
import contactsRouter from "./routes/api/contacts-router.js";
import googleAuthRouter from "./routes/api/google-auth-router.js";


const app = express(); // - web-server

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use("/users", authRouter);
app.use("/api/contacts/", contactsRouter);
app.use("/auth", googleAuthRouter);


// Код для перевірки авторизації з link.html
const basePath = path.resolve();

app.use(express.static(path.join(basePath, "public")));
app.get("/link", (req, res) => {
  res.sendFile(path.join(basePath, "public", "link.html"));
});
// Код для перевірки авторизації з link.html


app.use((req, res) => {
  res.status(404).json({ message: "Not Found" })
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});


export default app;