import express from "express";
import { router } from "./routes/api/contacts.js";
import logger from "morgan";
import cors from "cors";
export const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["PUT", "DELETE"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
