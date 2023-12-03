import express from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts-router.js";
// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";
import authRouter from "./routes/api/auth-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(
    `<h1>Home page</h1><a href="/">Home</a> <a href="/contacts">Contacts</a>`
  );
});
app.get("/contacts", (req, res) => {
  res.send(
    `<h1>Contacts</h1>
    <a href="/">Home</a> <a href="/contacts">Contacts</a>
    <div><img src="/avatars/1701561126762_420970656}_Screenshot from 2023-08-18 17-58-21.png"></div>
    `
  );
});

app.use("/api/contacts", contactsRouter);

app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});
export default app;
