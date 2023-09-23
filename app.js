import express from "express";
import logger from "morgan";
import cors from "cors";
// import bodyParser from "body-parser";
import * as contactsRouter from "./routes/api/contacts.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(bodyParser.json());

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Наше промежуточное ПО");
//   next();
// });

app.use("/api/contacts.js", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
