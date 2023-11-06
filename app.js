import express, { json } from "express";
import logger from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts.js";
import "colors";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.use(cors());
app.use(json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found!" });
});

app.use((err, _, res, __) => {
  console.log("Error Here!".red);
  console.error(err);

  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
